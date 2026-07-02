import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rule, RuleSchema } from './schemas/rule.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Rule.name, schema: RuleSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class RulesModule { }