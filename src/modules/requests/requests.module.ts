import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { requestsProviders } from './requests.providers';

@Module({
  providers: [RequestsService, ...requestsProviders],
  controllers: [RequestsController]
})
export class RequestsModule {}
