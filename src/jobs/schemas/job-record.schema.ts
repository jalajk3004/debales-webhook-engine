import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobRecordDocument = JobRecord & Document;

@Schema({ timestamps: true })
export class JobRecord {
    @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
    tenantId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'WebhookEvent', required: true })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Rule' })
    ruleId: Types.ObjectId;

    @Prop()
    bullJobId: string;

    @Prop({
        enum: ['queued', 'processing', 'processed', 'failed'],
        default: 'queued',
    })
    status: string;

    @Prop({ default: 0 })
    attempts: number;

    @Prop()
    lastError: string;

    @Prop({ type: Object })
    result: Record<string, any>;
}

export const JobRecordSchema = SchemaFactory.createForClass(JobRecord);
JobRecordSchema.index({ tenantId: 1, status: 1 });