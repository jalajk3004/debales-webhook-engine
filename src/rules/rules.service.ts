import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rule, RuleDocument } from './schemas/rule.schema';

@Injectable()
export class RulesService {
    constructor(
        @InjectModel(Rule.name) private ruleModel: Model<RuleDocument>,
    ) { }

    async findMatchingRules(tenantId: string, eventType: string) {
        return this.ruleModel.find({ tenantId, eventType, enabled: true });
    }

    evaluate(rule: RuleDocument, payload: Record<string, any>): boolean {
        return rule.conditions.every((cond) =>
            this.evaluateCondition(payload, cond),
        );
    }

    private evaluateCondition(
        payload: Record<string, any>,
        cond: { field: string; operator: string; value: any },
    ): boolean {
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

    // supports dot-paths like "payload.total_price"
    private getField(obj: Record<string, any>, path: string): any {
        return path
            .split('.')
            .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
    }
}