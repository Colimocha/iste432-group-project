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

/**
 * A controller that handle the requests for the ballots from the frontend
 *
 * @class BallotController
 */
@Controller('ballot')
@UseGuards(JwtGuard)
export class BallotController {
  /**
   * A constructor for the ballot controller
   *
   * @param ballotService
   * @controller
   */
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

  @Get(':id/vote-results')
  getVoteResult(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.ballotService.getVoteResult(+id);
  }
}
