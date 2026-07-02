import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JobRecord, JobRecordDocument } from './schemas/job-record.schema';

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(JobRecord.name)
        private jobRecordModel: Model<JobRecordDocument>,
    ) { }

    create(params: { tenantId: string; eventId: string; bullJobId: string }) {
        return this.jobRecordModel.create({
            tenantId: params.tenantId,
            eventId: params.eventId,
            bullJobId: params.bullJobId,
            status: 'queued',
            attempts: 0,
        });
    }

    findByBullJobId(bullJobId: string) {
        return this.jobRecordModel.findOne({ bullJobId });
    }

    async markProcessing(id: Types.ObjectId) {
        return this.jobRecordModel.findByIdAndUpdate(id, {
            status: 'processing',
            $inc: { attempts: 1 },
        });
    }

    async markProcessed(id: Types.ObjectId, result: Record<string, any>) {
        return this.jobRecordModel.findByIdAndUpdate(id, {
            status: 'processed',
            result,
        });
    }

    async markFailed(id: Types.ObjectId, error: string) {
        return this.jobRecordModel.findByIdAndUpdate(id, {
            status: 'failed',
            lastError: error,
        });
    }

    findAllForTenant(tenantId: string) {
        return this.jobRecordModel
            .find({ tenantId })
            .sort({ createdAt: -1 })
            .limit(200);
    }
}