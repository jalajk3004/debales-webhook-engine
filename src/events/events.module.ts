import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookEvent, WebhookEventSchema } from './schemas/webhook-event.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: WebhookEvent.name, schema: WebhookEventSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class EventsModule { }