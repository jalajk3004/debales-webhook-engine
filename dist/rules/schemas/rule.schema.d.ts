import { Document, Types } from 'mongoose';
export type RuleDocument = Rule & Document;
declare class Condition {
    field: string;
    operator: string;
    value: any;
}
declare class ActionConfig {
    type: string;
    config: Record<string, any>;
}
export declare class Rule {
    tenantId: Types.ObjectId;
    eventType: string;
    conditions: Condition[];
    actions: ActionConfig[];
    enabled: boolean;
}
export declare const RuleSchema: import("mongoose").Schema<Rule, import("mongoose").Model<Rule, any, any, any, any, any, Rule>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rule, Document<unknown, {}, Rule, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Rule & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    tenantId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Rule, Document<unknown, {}, Rule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    eventType?: import("mongoose").SchemaDefinitionProperty<string, Rule, Document<unknown, {}, Rule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    conditions?: import("mongoose").SchemaDefinitionProperty<Condition[], Rule, Document<unknown, {}, Rule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    actions?: import("mongoose").SchemaDefinitionProperty<ActionConfig[], Rule, Document<unknown, {}, Rule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    enabled?: import("mongoose").SchemaDefinitionProperty<boolean, Rule, Document<unknown, {}, Rule, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rule & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Rule>;
export {};
