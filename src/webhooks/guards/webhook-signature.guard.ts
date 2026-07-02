import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { Tenant, TenantDocument } from '../../tenants/schemas/tenant.schema';

@Injectable()
export class WebhookSignatureGuard implements CanActivate {
    constructor(
        @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const { tenantId } = req.params;

        const tenant = await this.tenantModel.findById(tenantId);
        if (!tenant) {
            throw new NotFoundException('Unknown tenant');
        }

        const signatureHeader = req.headers['x-webhook-signature'];
        if (!signatureHeader || !req.rawBody) {
            throw new UnauthorizedException('Missing signature or body');
        }

        const expected = crypto
            .createHmac('sha256', tenant.webhookSecret)
            .update(req.rawBody)
            .digest('hex');

        const provided = Buffer.from(signatureHeader);
        const expectedBuf = Buffer.from(expected);
        const valid =
            provided.length === expectedBuf.length &&
            crypto.timingSafeEqual(provided, expectedBuf);

        if (!valid) {
            throw new UnauthorizedException('Invalid signature');
        }

        req.tenant = tenant;
        return true;
    }
}