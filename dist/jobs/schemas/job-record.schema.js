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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRecordSchema = exports.JobRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let JobRecord = class JobRecord {
    tenantId;
    eventId;
    ruleId;
    bullJobId;
    status;
    attempts;
    lastError;
    result;
};
exports.JobRecord = JobRecord;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Tenant', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JobRecord.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'WebhookEvent', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JobRecord.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Rule' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JobRecord.prototype, "ruleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobRecord.prototype, "bullJobId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['queued', 'processing', 'processed', 'failed'],
        default: 'queued',
    }),
    __metadata("design:type", String)
], JobRecord.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], JobRecord.prototype, "attempts", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], JobRecord.prototype, "lastError", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], JobRecord.prototype, "result", void 0);
exports.JobRecord = JobRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], JobRecord);
exports.JobRecordSchema = mongoose_1.SchemaFactory.createForClass(JobRecord);
exports.JobRecordSchema.index({ tenantId: 1, status: 1 });
//# sourceMappingURL=job-record.schema.js.map