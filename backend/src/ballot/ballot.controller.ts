import { JwtGuard } from './../auth/guard/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
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
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.ballotService.findOne(+id);
  }

  @Get('society/:societyId')
  findManyBySocietyId(
    @Param(
      'societyId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    societyId: string,
  ) {
    return this.ballotService.findManyBySocietyId(+societyId);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateBallotDto: UpdateBallotDto,
  ) {
    return this.ballotService.update(+id, updateBallotDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.ballotService.remove(+id);
  }
}
