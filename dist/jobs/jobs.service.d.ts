import { Model, Types } from 'mongoose';
import { JobRecord, JobRecordDocument } from './schemas/job-record.schema';
export declare class JobsService {
    private jobRecordModel;
    constructor(jobRecordModel: Model<JobRecordDocument>);
    create(params: {
        tenantId: string;
        eventId: string;
        bullJobId: string;
    }): Promise<import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByBullJobId(bullJobId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null, import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, JobRecordDocument, "findOne", {}>;
    markProcessing(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    markProcessed(id: Types.ObjectId, result: Record<string, any>): Promise<(import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    markFailed(id: Types.ObjectId, error: string): Promise<(import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    findAllForTenant(tenantId: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, JobRecordDocument, {}, import("mongoose").DefaultSchemaOptions> & JobRecord & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }, {}, JobRecordDocument, "find", {}>;
}
