import { WorkerHost } from '@nestjs/bullmq';
import { Model } from 'mongoose';
import { Job } from 'bullmq';
import { WebhookEventDocument } from '../../events/schemas/webhook-event.schema';
import { JobsService } from '../jobs.service';
import { RulesService } from '../../rules/rules.service';
import { ActionsService } from '../../actions/actions.service';
export declare class RuleEvaluationProcessor extends WorkerHost {
    private eventModel;
    private jobsService;
    private rulesService;
    private actionsService;
    private readonly logger;
    constructor(eventModel: Model<WebhookEventDocument>, jobsService: JobsService, rulesService: RulesService, actionsService: ActionsService);
    onFailed(job: Job, error: Error): Promise<void>;
    process(job: Job<{
        eventId: string;
        tenantId: string;
    }>): Promise<Record<string, any>>;
}
