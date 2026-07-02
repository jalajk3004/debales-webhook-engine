import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { JobRecord, JobRecordSchema } from './schemas/job-record.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: JobRecord.name, schema: JobRecordSchema },
        ]),
        BullModule.registerQueue({
            name: 'rule-evaluation',
        }),
    ],
    exports: [MongooseModule, BullModule],
})
export class JobsModule { }