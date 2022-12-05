import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';

/**
 * A module that contains the controller and service for office
 */
@Module({
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
