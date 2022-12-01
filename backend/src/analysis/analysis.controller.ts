import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@UseGuards(JwtGuard)
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('stat')
  getStat() {
    return this.analysisService.getStat();
  }
}
