import { Module } from '@nestjs/common';
import { SocietyContactService } from './society-contact.service';
import { SocietyContactController } from './society-contact.controller';

/**
 * A module that contains the controller and service for the society contact
 */
@Module({
  controllers: [SocietyContactController],
  providers: [SocietyContactService],
})
export class SocietyContactModule {}
