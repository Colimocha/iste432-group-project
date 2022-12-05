import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';

/**
 * A module that contains the controller and service for the vote
 */
@Module({
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
