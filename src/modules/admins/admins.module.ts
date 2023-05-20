import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { adminsProviders } from './admins.providers'

@Module({
  providers: [AdminsService,...adminsProviders],
  exports: [AdminsService]
})
export class AdminsModule {}
