import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { JobRecord, JobRecordSchema } from './schemas/job-record.schema';
import { WebhookEvent, WebhookEventSchema } from '../events/schemas/webhook-event.schema';
import { JobsService } from './jobs.service';
import { RuleEvaluationProcessor } from './processors/rule-evaluation.processor';
import { RulesModule } from '../rules/rules.module';
import { ActionsModule } from '../actions/actions.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: JobRecord.name, schema: JobRecordSchema },
            { name: WebhookEvent.name, schema: WebhookEventSchema },
        ]),
        BullModule.registerQueue({ name: 'rule-evaluation' }),
        RulesModule,
        ActionsModule,
    ],
    providers: [JobsService, RuleEvaluationProcessor],
    exports: [MongooseModule, BullModule, JobsService],
})
export class JobsModule { }