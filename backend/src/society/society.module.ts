import { Module } from '@nestjs/common';
import { SocietyService } from './society.service';
import { SocietyController } from './society.controller';

/**
 * A module that contains the controller and service for society
 */
@Module({
  controllers: [SocietyController],
  providers: [SocietyService],
})
export class SocietyModule {}
