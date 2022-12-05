import { Module } from '@nestjs/common';
import { VotersService } from './voter.service';
import { VotersController } from './voter.controller';

/**
 * A module that contains the controller and service for the voters
 */
@Module({
  controllers: [VotersController],
  providers: [VotersService],
})
export class VotersModule {}
