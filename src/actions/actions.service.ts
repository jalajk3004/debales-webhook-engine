import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrmRecord, CrmRecordDocument } from './schemas/crm-record.schema';

interface ActionConfig {
    type: string;
    config: Record<string, any>;
}

@Injectable()
export class ActionsService {
    private readonly logger = new Logger(ActionsService.name);

    constructor(
        @InjectModel(CrmRecord.name)
        private crmModel: Model<CrmRecordDocument>,
    ) { }

    async dispatch(
        action: ActionConfig,
        payload: Record<string, any>,
        tenantId: string,
    ): Promise<any> {
        switch (action.type) {
            case 'notify':
                return this.notify(action.config, payload);
            case 'crmUpdate':
                return this.crmUpdate(tenantId, payload);
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }

    private async notify(config: Record<string, any>, payload: Record<string, any>) {
        // Deliberately fail if the payload requests it — lets us demo failure/replay
        if (payload?.forceActionFailure === 'notify') {
            throw new Error('Simulated notify failure (forceActionFailure flag set)');
        }
        this.logger.log(`NOTIFY: sales team about ${JSON.stringify(payload)}`);
        return { notified: true, at: new Date().toISOString() };
    }

    private async crmUpdate(tenantId: string, payload: Record<string, any>) {
        const record = await this.crmModel.create({
            tenantId,
            externalRef: payload.order_id ?? payload.id ?? 'unknown',
            data: payload,
        });
        return { crmRecordId: record._id };
    }
}