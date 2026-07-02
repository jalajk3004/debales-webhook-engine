import { IsOptional, IsString } from 'class-validator';


export class IncomingWebhookDto {
    @IsOptional()
    @IsString()
    eventType?: string;
}