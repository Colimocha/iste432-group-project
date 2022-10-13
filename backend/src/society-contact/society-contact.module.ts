import { Module } from '@nestjs/common';
import { SocietyContactService } from './society-contact.service';
import { SocietyContactController } from './society-contact.controller';

@Module({
  controllers: [SocietyContactController],
  providers: [SocietyContactService]
})
export class SocietyContactModule {}
