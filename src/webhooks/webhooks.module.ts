import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { WebhookSignatureGuard } from './guards/webhook-signature.guard';
import { Tenant, TenantSchema } from '../tenants/schemas/tenant.schema';
import { WebhookEvent, WebhookEventSchema } from '../events/schemas/webhook-event.schema';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: WebhookEvent.name, schema: WebhookEventSchema },
    ]),
    JobsModule, // gives us the 'rule-evaluation' queue via BullModule export
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService, WebhookSignatureGuard],
})
export class WebhooksModule { }