"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WebhooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bullmq_1 = require("@nestjs/bullmq");
const mongoose_2 = require("mongoose");
const bullmq_2 = require("bullmq");
const crypto = __importStar(require("crypto"));
const webhook_event_schema_1 = require("../events/schemas/webhook-event.schema");
const jobs_service_1 = require("../jobs/jobs.service");
let WebhooksService = WebhooksService_1 = class WebhooksService {
    eventModel;
    queue;
    jobsService;
    logger = new common_1.Logger(WebhooksService_1.name);
    constructor(eventModel, queue, jobsService) {
        this.eventModel = eventModel;
        this.queue = queue;
        this.jobsService = jobsService;
    }
    async ingest(params) {
        const idempotencyKey = params.sourceEventId ?? this.hashPayload(params.rawBody);
        let event;
        try {
            event = await this.eventModel.create({
                tenantId: params.tenantId,
                source: params.source,
                eventType: params.eventType,
                idempotencyKey,
                rawPayload: params.payload,
                status: 'received',
            });
        }
        catch (err) {
            if (err.code === 11000) {
                this.logger.log(`Duplicate webhook ignored: tenant=${params.tenantId} key=${idempotencyKey}`);
                return { status: 'duplicate', message: 'Event already received' };
            }
            throw err;
        }
        const job = await this.queue.add('evaluate-event', { eventId: event._id.toString(), tenantId: params.tenantId }, {
            attempts: 3,
            backoff: { type: 'exponential', delay: 2000 },
            removeOnComplete: 1000,
            removeOnFail: false,
        });
        await this.jobsService.create({
            tenantId: params.tenantId,
            eventId: event._id.toString(),
            bullJobId: job.id,
        });
        return { status: 'accepted', eventId: event._id, jobId: job.id };
    }
    hashPayload(rawBody) {
        return crypto.createHash('sha256').update(rawBody).digest('hex');
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = WebhooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(webhook_event_schema_1.WebhookEvent.name)),
    __param(1, (0, bullmq_1.InjectQueue)('rule-evaluation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bullmq_2.Queue,
        jobs_service_1.JobsService])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map