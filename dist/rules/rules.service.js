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
exports.RulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rule_schema_1 = require("./schemas/rule.schema");
let RulesService = class RulesService {
    ruleModel;
    constructor(ruleModel) {
        this.ruleModel = ruleModel;
    }
    async findMatchingRules(tenantId, eventType) {
        return this.ruleModel.find({ tenantId, eventType, enabled: true });
    }
    evaluate(rule, payload) {
        return rule.conditions.every((cond) => this.evaluateCondition(payload, cond));
    }
    evaluateCondition(payload, cond) {
        const actual = this.getField(payload, cond.field);
        switch (cond.operator) {
            case 'equals':
                return actual === cond.value;
            case 'greaterThan':
                return Number(actual) > Number(cond.value);
            case 'contains':
                return typeof actual === 'string' && actual.includes(cond.value);
            default:
                return false;
        }
    }
    getField(obj, path) {
        return path
            .split('.')
            .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
    }
};
exports.RulesService = RulesService;
exports.RulesService = RulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rule_schema_1.Rule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RulesService);
//# sourceMappingURL=rules.service.js.map