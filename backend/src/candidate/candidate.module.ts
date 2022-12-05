import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';

/**
 * A module that contains the controller and service for candidate
 */
@Module({
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
