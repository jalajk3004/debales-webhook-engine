import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Model } from 'mongoose';
import { TenantDocument } from '../../tenants/schemas/tenant.schema';
export declare class WebhookSignatureGuard implements CanActivate {
    private tenantModel;
    constructor(tenantModel: Model<TenantDocument>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
