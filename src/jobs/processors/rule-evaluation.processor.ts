import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'bullmq';
import { WebhookEvent, WebhookEventDocument } from '../../events/schemas/webhook-event.schema';
import { JobsService } from '../jobs.service';
import { RulesService } from '../../rules/rules.service';
import { ActionsService } from '../../actions/actions.service';

@Processor('rule-evaluation')
export class RuleEvaluationProcessor extends WorkerHost {
    private readonly logger = new Logger(RuleEvaluationProcessor.name);


    constructor(
        @InjectModel(WebhookEvent.name)
        private eventModel: Model<WebhookEventDocument>,
        private jobsService: JobsService,
        private rulesService: RulesService,
        private actionsService: ActionsService,
    ) {
        super();
    }

    @OnWorkerEvent('failed')
    async onFailed(job: Job, error: Error) {
        this.logger.error(`Job ${job.id} failed: ${error.message}`);
        const jobRecord = await this.jobsService.findByBullJobId(job.id!);
        if (jobRecord) {
            await this.jobsService.markFailed(jobRecord._id, error.message);
        }
    }

    async process(job: Job<{ eventId: string; tenantId: string }>) {
        const { eventId, tenantId } = job.data;

        const jobRecord = await this.jobsService.findByBullJobId(job.id!);
        if (!jobRecord) {
            // Should not happen in practice, but fail loudly rather than silently.
            throw new Error(`No JobRecord found for bullJobId=${job.id}`);
        }

        // Idempotency guard: if a previous attempt already completed this
        // (e.g. worker crashed AFTER marking processed but BEFORE BullMQ
        // acked the job, causing a redelivery), skip re-running side effects.
        if (jobRecord.status === 'processed') {
            this.logger.log(`Job ${job.id} already processed, skipping re-run`);
            return jobRecord.result;
        }

        await this.jobsService.markProcessing(jobRecord._id);

        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new Error(`WebhookEvent ${eventId} not found`);
        }

        const rules = await this.rulesService.findMatchingRules(
            tenantId,
            event.eventType,
        );

        const results = [];
        for (const rule of rules) {
            if (!this.rulesService.evaluate(rule, event.rawPayload)) continue;

            for (const action of rule.actions) {
                // Let action failures propagate — BullMQ retry/backoff handles it,
                // and markFailed (below, in the onFailed listener) records why.
                const result = await this.actionsService.dispatch(
                    action,
                    event.rawPayload,
                    tenantId,
                );
                results.push({ ruleId: rule._id, action: action.type, result });
            }
        }

        await this.jobsService.markProcessed(jobRecord._id, { results });
        event.status = 'processed';
        await event.save();

        return { results };
    }
}