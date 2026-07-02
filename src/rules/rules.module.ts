import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rule, RuleSchema } from './schemas/rule.schema';
import { RulesService } from './rules.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Rule.name, schema: RuleSchema },
        ]),
    ],
    providers: [RulesService],
    exports: [MongooseModule, RulesService],
})
export class RulesModule { }