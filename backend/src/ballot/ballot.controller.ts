import { JwtGuard } from 'src/auth/guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BallotService } from './ballot.service';
import { CreateBallotDto, UpdateBallotDto } from './dto';

@Controller('ballot')
@UseGuards(JwtGuard)
export class BallotController {
  constructor(private readonly ballotService: BallotService) {}

  @Post()
  create(@Body() createBallotDto: CreateBallotDto) {
    return this.ballotService.create(createBallotDto);
  }

  @Get()
  findAll() {
    return this.ballotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ballotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBallotDto: UpdateBallotDto) {
    return this.ballotService.update(+id, updateBallotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ballotService.remove(+id);
  }
}
