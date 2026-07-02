import { Body, Controller, Headers, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { WebhookSignatureGuard } from './guards/webhook-signature.guard';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
    constructor(private readonly webhooksService: WebhooksService) { }

    @Post(':tenantId/:source')
    @HttpCode(200)
    @UseGuards(WebhookSignatureGuard)
    async receive(
        @Param('tenantId') tenantId: string,
        @Param('source') source: string,
        @Headers('x-event-id') sourceEventId: string | undefined,
        @Headers('x-event-type') eventType: string | undefined,
        @Body() payload: Record<string, any>,
        @Req() req: Request & { rawBody: Buffer },
    ) {
        return this.webhooksService.ingest({
            tenantId,
            source,
            sourceEventId,
            eventType: eventType ?? 'unknown',
            payload,
            rawBody: req.rawBody,
        });
    }
}