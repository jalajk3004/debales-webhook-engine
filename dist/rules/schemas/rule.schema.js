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
exports.RuleSchema = exports.Rule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class Condition {
    field;
    operator;
    value;
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Condition.prototype, "field", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['equals', 'greaterThan', 'contains'] }),
    __metadata("design:type", String)
], Condition.prototype, "operator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Object }),
    __metadata("design:type", Object)
], Condition.prototype, "value", void 0);
class ActionConfig {
    type;
    config;
}
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['notify', 'crmUpdate'] }),
    __metadata("design:type", String)
], ActionConfig.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ActionConfig.prototype, "config", void 0);
let Rule = class Rule {
    tenantId;
    eventType;
    conditions;
    actions;
    enabled;
};
exports.Rule = Rule;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Tenant', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Rule.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Rule.prototype, "eventType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Condition], default: [] }),
    __metadata("design:type", Array)
], Rule.prototype, "conditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ActionConfig], default: [] }),
    __metadata("design:type", Array)
], Rule.prototype, "actions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Rule.prototype, "enabled", void 0);
exports.Rule = Rule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Rule);
exports.RuleSchema = mongoose_1.SchemaFactory.createForClass(Rule);
exports.RuleSchema.index({ tenantId: 1, eventType: 1 });
//# sourceMappingURL=rule.schema.js.map