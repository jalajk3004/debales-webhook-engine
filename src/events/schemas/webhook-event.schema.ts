import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WebhookEventDocument = WebhookEvent & Document;

@Schema({ timestamps: true })
export class WebhookEvent {
    @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
    tenantId: Types.ObjectId;

    @Prop({ required: true })
    source: string; // e.g. "shopify"

    @Prop({ required: true })
    eventType: string; // e.g. "order.created"

    // dedup key: from source header if available, else hash of payload
    @Prop({ required: true })
    idempotencyKey: string;

    @Prop({ type: Object, required: true })
    rawPayload: Record<string, any>;

    @Prop({
        enum: ['received', 'processing', 'processed', 'failed'],
        default: 'received',
    })
    status: string;
}

export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);

// THE critical line — enforces dedup at the DB layer, not just in app code
WebhookEventSchema.index(
    { tenantId: 1, idempotencyKey: 1 },
    { unique: true },
);