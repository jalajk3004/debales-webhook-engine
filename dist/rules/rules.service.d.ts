import { Model } from 'mongoose';
import { Rule, RuleDocument } from './schemas/rule.schema';
export declare class RulesService {
    private ruleModel;
    constructor(ruleModel: Model<RuleDocument>);
    findMatchingRules(tenantId: string, eventType: string): Promise<(import("mongoose").Document<unknown, {}, RuleDocument, {}, import("mongoose").DefaultSchemaOptions> & Rule & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    evaluate(rule: RuleDocument, payload: Record<string, any>): boolean;
    private evaluateCondition;
    private getField;
}
