import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RuleDocument = Rule & Document;

class Condition {
    @Prop({ required: true })
    field: string; // e.g. "payload.total_price"

    @Prop({ required: true, enum: ['equals', 'greaterThan', 'contains'] })
    operator: string;

    @Prop({ required: true, type: Object })
    value: any;
}

class ActionConfig {
    @Prop({ required: true, enum: ['notify', 'crmUpdate'] })
    type: string;

    @Prop({ type: Object })
    config: Record<string, any>; // e.g. { url: '...' } for notify
}

@Schema({ timestamps: true })
export class Rule {
    @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
    tenantId: Types.ObjectId;

    @Prop({ required: true })
    eventType: string;

    @Prop({ type: [Condition], default: [] })
    conditions: Condition[];

    @Prop({ type: [ActionConfig], default: [] })
    actions: ActionConfig[];

    @Prop({ default: true })
    enabled: boolean;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
RuleSchema.index({ tenantId: 1, eventType: 1 });