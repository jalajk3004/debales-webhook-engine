import { Document } from 'mongoose';
export type TenantDocument = Tenant & Document;
export declare class Tenant {
    name: string;
    webhookSecret: string;
}
export declare const TenantSchema: import("mongoose").Schema<Tenant, import("mongoose").Model<Tenant, any, any, any, any, any, Tenant>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tenant, Document<unknown, {}, Tenant, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Tenant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Tenant, Document<unknown, {}, Tenant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tenant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    webhookSecret?: import("mongoose").SchemaDefinitionProperty<string, Tenant, Document<unknown, {}, Tenant, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Tenant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Tenant>;
