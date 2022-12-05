import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

/**
 * Return the statistics
 *
 * @class AnalysisController
 */
@UseGuards(JwtGuard)
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  /**
   * @returns the number of records from the database
   */
  @Get('stat')
  getStat() {
    return this.analysisService.getStat();
  }
}
