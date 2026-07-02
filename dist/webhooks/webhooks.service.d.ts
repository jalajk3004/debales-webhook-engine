import { Model } from 'mongoose';
import { Queue } from 'bullmq';
import { WebhookEventDocument } from '../events/schemas/webhook-event.schema';
import { JobsService } from "../jobs/jobs.service";
interface IngestParams {
    tenantId: string;
    source: string;
    sourceEventId?: string;
    eventType: string;
    payload: Record<string, any>;
    rawBody: Buffer;
}
export declare class WebhooksService {
    private eventModel;
    private queue;
    private jobsService;
    private readonly logger;
    constructor(eventModel: Model<WebhookEventDocument>, queue: Queue, jobsService: JobsService);
    ingest(params: IngestParams): Promise<{
        status: string;
        message: string;
        eventId?: undefined;
        jobId?: undefined;
    } | {
        status: string;
        eventId: import("mongoose").Types.ObjectId;
        jobId: string | undefined;
        message?: undefined;
    }>;
    private hashPayload;
}
export {};
