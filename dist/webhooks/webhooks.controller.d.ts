import { Request } from 'express';
import { WebhooksService } from './webhooks.service';
export declare class WebhooksController {
    private readonly webhooksService;
    constructor(webhooksService: WebhooksService);
    receive(tenantId: string, source: string, sourceEventId: string | undefined, eventType: string | undefined, payload: Record<string, any>, req: Request & {
        rawBody: Buffer;
    }): Promise<{
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
}
