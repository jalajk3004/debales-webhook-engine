"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bullmq_1 = require("@nestjs/bullmq");
const job_record_schema_1 = require("./schemas/job-record.schema");
const webhook_event_schema_1 = require("../events/schemas/webhook-event.schema");
const jobs_service_1 = require("./jobs.service");
const rule_evaluation_processor_1 = require("./processors/rule-evaluation.processor");
const rules_module_1 = require("../rules/rules.module");
const actions_module_1 = require("../actions/actions.module");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: job_record_schema_1.JobRecord.name, schema: job_record_schema_1.JobRecordSchema },
                { name: webhook_event_schema_1.WebhookEvent.name, schema: webhook_event_schema_1.WebhookEventSchema },
            ]),
            bullmq_1.BullModule.registerQueue({ name: 'rule-evaluation' }),
            rules_module_1.RulesModule,
            actions_module_1.ActionsModule,
        ],
        providers: [jobs_service_1.JobsService, rule_evaluation_processor_1.RuleEvaluationProcessor],
        exports: [mongoose_1.MongooseModule, bullmq_1.BullModule, jobs_service_1.JobsService],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map