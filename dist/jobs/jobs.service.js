"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_record_schema_1 = require("./schemas/job-record.schema");
let JobsService = class JobsService {
    jobRecordModel;
    constructor(jobRecordModel) {
        this.jobRecordModel = jobRecordModel;
    }
    create(params) {
        return this.jobRecordModel.create({
            tenantId: params.tenantId,
            eventId: params.eventId,
            bullJobId: params.bullJobId,
            status: 'queued',
            attempts: 0,
        });
    }
    findByBullJobId(bullJobId) {
        return this.jobRecordModel.findOne({ bullJobId });
    }
    async markProcessing(id) {
        return this.jobRecordModel.findByIdAndUpdate(id, {
            status: 'processing',
            $inc: { attempts: 1 },
        });
    }
    async markProcessed(id, result) {
        return this.jobRecordModel.findByIdAndUpdate(id, {
            status: 'processed',
            result,
        });
    }
    async markFailed(id, error) {
        return this.jobRecordModel.findByIdAndUpdate(id, {
            status: 'failed',
            lastError: error,
        });
    }
    findAllForTenant(tenantId) {
        return this.jobRecordModel
            .find({ tenantId })
            .sort({ createdAt: -1 })
            .limit(200);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_record_schema_1.JobRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobsService);
//# sourceMappingURL=jobs.service.js.map