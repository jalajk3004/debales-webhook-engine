import { Document, Types } from 'mongoose';
export type CrmRecordDocument = CrmRecord & Document;
export declare class CrmRecord {
    tenantId: Types.ObjectId;
    externalRef: string;
    data: Record<string, any>;
}
export declare const CrmRecordSchema: import("mongoose").Schema<CrmRecord, import("mongoose").Model<CrmRecord, any, any, any, any, any, CrmRecord>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CrmRecord, Document<unknown, {}, CrmRecord, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CrmRecord & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tenantId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, CrmRecord, Document<unknown, {}, CrmRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CrmRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    externalRef?: import("mongoose").SchemaDefinitionProperty<string, CrmRecord, Document<unknown, {}, CrmRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CrmRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    data?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, CrmRecord, Document<unknown, {}, CrmRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CrmRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, CrmRecord>;
