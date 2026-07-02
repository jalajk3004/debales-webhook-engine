import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionsService } from './actions.service';
import { CrmRecord, CrmRecordSchema } from './schemas/crm-record.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CrmRecord.name, schema: CrmRecordSchema },
    ]),
  ],
  providers: [ActionsService],
  exports: [ActionsService],
})
export class ActionsModule { }