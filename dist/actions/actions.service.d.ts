import { Model } from 'mongoose';
import { CrmRecordDocument } from './schemas/crm-record.schema';
interface ActionConfig {
    type: string;
    config: Record<string, any>;
}
export declare class ActionsService {
    private crmModel;
    private readonly logger;
    constructor(crmModel: Model<CrmRecordDocument>);
    dispatch(action: ActionConfig, payload: Record<string, any>, tenantId: string): Promise<any>;
    private notify;
    private crmUpdate;
}
export {};
