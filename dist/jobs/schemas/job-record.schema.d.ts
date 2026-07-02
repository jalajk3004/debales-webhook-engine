import { Document, Types } from 'mongoose';
export type JobRecordDocument = JobRecord & Document;
export declare class JobRecord {
    tenantId: Types.ObjectId;
    eventId: Types.ObjectId;
    ruleId: Types.ObjectId;
    bullJobId: string;
    status: string;
    attempts: number;
    lastError: string;
    result: Record<string, any>;
}
export declare const JobRecordSchema: import("mongoose").Schema<JobRecord, import("mongoose").Model<JobRecord, any, any, any, any, any, JobRecord>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JobRecord, Document<unknown, {}, JobRecord, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tenantId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    eventId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    ruleId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    bullJobId?: import("mongoose").SchemaDefinitionProperty<string, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    attempts?: import("mongoose").SchemaDefinitionProperty<number, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    lastError?: import("mongoose").SchemaDefinitionProperty<string, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    result?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, JobRecord, Document<unknown, {}, JobRecord, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<JobRecord & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, JobRecord>;
