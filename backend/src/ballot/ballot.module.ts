import { Module } from '@nestjs/common';
import { BallotService } from './ballot.service';
import { BallotController } from './ballot.controller';

/**
 * A module that contains the controller and service for ballot
 */
@Module({
  controllers: [BallotController],
  providers: [BallotService],
})
export class BallotModule {}
