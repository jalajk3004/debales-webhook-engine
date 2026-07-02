import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CrmRecordDocument = CrmRecord & Document;

@Schema({ timestamps: true })
export class CrmRecord {
    @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
    tenantId: Types.ObjectId;

    @Prop({ required: true })
    externalRef: string;

    @Prop({ type: Object })
    data: Record<string, any>;
}

export const CrmRecordSchema = SchemaFactory.createForClass(CrmRecord);