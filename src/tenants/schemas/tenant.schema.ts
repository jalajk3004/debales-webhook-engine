import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema({ timestamps: true })
export class Tenant {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    webhookSecret: string; // used to verify HMAC signatures per tenant
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);