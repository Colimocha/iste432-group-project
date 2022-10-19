import { Module } from '@nestjs/common';
import { VotersService } from './voter.service';
import { VotersController } from './voter.controller';

@Module({
  controllers: [VotersController],
  providers: [VotersService],
})
export class VotersModule {}
