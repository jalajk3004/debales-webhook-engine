import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bullmq';
import { Model } from 'mongoose';
import { Queue } from 'bullmq';
import * as crypto from 'crypto';
import {
    WebhookEvent,
    WebhookEventDocument,
} from '../events/schemas/webhook-event.schema';
import { JobsService } from 'src/jobs/jobs.service';

interface IngestParams {
    tenantId: string;
    source: string;
    sourceEventId?: string;
    eventType: string;
    payload: Record<string, any>;
    rawBody: Buffer;
}

@Injectable()
export class WebhooksService {
    private readonly logger = new Logger(WebhooksService.name);

    constructor(
        @InjectModel(WebhookEvent.name) private eventModel: Model<WebhookEventDocument>,
        @InjectQueue('rule-evaluation') private queue: Queue,
        private jobsService: JobsService,
    ) { }

    async ingest(params: IngestParams) {
        const idempotencyKey =
            params.sourceEventId ?? this.hashPayload(params.rawBody);

        let event: WebhookEventDocument;
        try {
            // Single atomic write. If (tenantId, idempotencyKey) already exists,
            // Mongo throws E11000 — that IS our dedup check, no race window.
            event = await this.eventModel.create({
                tenantId: params.tenantId,
                source: params.source,
                eventType: params.eventType,
                idempotencyKey,
                rawPayload: params.payload,
                status: 'received',
            });
        } catch (err: any) {
            if (err.code === 11000) {
                this.logger.log(
                    `Duplicate webhook ignored: tenant=${params.tenantId} key=${idempotencyKey}`,
                );
                return { status: 'duplicate', message: 'Event already received' };
            }
            throw err;
        }

        // Enqueue by reference only — the processor re-fetches fresh data.
        // Keeps job payloads tiny and avoids stale-data bugs.
        const job = await this.queue.add(
            'evaluate-event',
            { eventId: event._id.toString(), tenantId: params.tenantId },
            {
                attempts: 3,
                backoff: { type: 'exponential', delay: 2000 },
                removeOnComplete: 1000,
                removeOnFail: false, // keep failed jobs visible for replay
            },
        );

        await this.jobsService.create({
            tenantId: params.tenantId,
            eventId: event._id.toString(),
            bullJobId: job.id!,
        });

        return { status: 'accepted', eventId: event._id, jobId: job.id };
    }

    private hashPayload(rawBody: Buffer): string {
        return crypto.createHash('sha256').update(rawBody).digest('hex');
    }
}