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
var RuleEvaluationProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEvaluationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bullmq_2 = require("bullmq");
const webhook_event_schema_1 = require("../../events/schemas/webhook-event.schema");
const jobs_service_1 = require("../jobs.service");
const rules_service_1 = require("../../rules/rules.service");
const actions_service_1 = require("../../actions/actions.service");
let RuleEvaluationProcessor = RuleEvaluationProcessor_1 = class RuleEvaluationProcessor extends bullmq_1.WorkerHost {
    eventModel;
    jobsService;
    rulesService;
    actionsService;
    logger = new common_1.Logger(RuleEvaluationProcessor_1.name);
    constructor(eventModel, jobsService, rulesService, actionsService) {
        super();
        this.eventModel = eventModel;
        this.jobsService = jobsService;
        this.rulesService = rulesService;
        this.actionsService = actionsService;
    }
    async onFailed(job, error) {
        this.logger.error(`Job ${job.id} failed: ${error.message}`);
        const jobRecord = await this.jobsService.findByBullJobId(job.id);
        if (jobRecord) {
            await this.jobsService.markFailed(jobRecord._id, error.message);
        }
    }
    async process(job) {
        const { eventId, tenantId } = job.data;
        const jobRecord = await this.jobsService.findByBullJobId(job.id);
        if (!jobRecord) {
            throw new Error(`No JobRecord found for bullJobId=${job.id}`);
        }
        if (jobRecord.status === 'processed') {
            this.logger.log(`Job ${job.id} already processed, skipping re-run`);
            return jobRecord.result;
        }
        await this.jobsService.markProcessing(jobRecord._id);
        const event = await this.eventModel.findById(eventId);
        if (!event) {
            throw new Error(`WebhookEvent ${eventId} not found`);
        }
        const rules = await this.rulesService.findMatchingRules(tenantId, event.eventType);
        const results = [];
        for (const rule of rules) {
            if (!this.rulesService.evaluate(rule, event.rawPayload))
                continue;
            for (const action of rule.actions) {
                const result = await this.actionsService.dispatch(action, event.rawPayload, tenantId);
                results.push({ ruleId: rule._id, action: action.type, result });
            }
        }
        await this.jobsService.markProcessed(jobRecord._id, { results });
        event.status = 'processed';
        await event.save();
        return { results };
    }
};
exports.RuleEvaluationProcessor = RuleEvaluationProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Error]),
    __metadata("design:returntype", Promise)
], RuleEvaluationProcessor.prototype, "onFailed", null);
exports.RuleEvaluationProcessor = RuleEvaluationProcessor = RuleEvaluationProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('rule-evaluation'),
    __param(0, (0, mongoose_1.InjectModel)(webhook_event_schema_1.WebhookEvent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jobs_service_1.JobsService,
        rules_service_1.RulesService,
        actions_service_1.ActionsService])
], RuleEvaluationProcessor);
//# sourceMappingURL=rule-evaluation.processor.js.map