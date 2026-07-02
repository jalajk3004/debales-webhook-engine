import { Document, Types } from 'mongoose';
export type WebhookEventDocument = WebhookEvent & Document;
export declare class WebhookEvent {
    tenantId: Types.ObjectId;
    source: string;
    eventType: string;
    idempotencyKey: string;
    rawPayload: Record<string, any>;
    status: string;
}
export declare const WebhookEventSchema: import("mongoose").Schema<WebhookEvent, import("mongoose").Model<WebhookEvent, any, any, any, any, any, WebhookEvent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WebhookEvent, Document<unknown, {}, WebhookEvent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tenantId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    eventType?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    idempotencyKey?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rawPayload?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, WebhookEvent, Document<unknown, {}, WebhookEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WebhookEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, WebhookEvent>;
