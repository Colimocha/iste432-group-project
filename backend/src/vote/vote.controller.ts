import { JwtGuard } from 'src/auth/guard/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto, UpdateVoteDto } from './dto';

/**
 * A controller that handles the request for the vote from the frontend
 * 
 * @class VoteController
 */
@Controller('vote')
@UseGuards(JwtGuard)
export class VoteController {
  /**
   * a constructor for the vote controller
   * 
   * @param voteService 
   * @constructor
   */
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }

  @Get()
  findAll() {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.voteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateVoteDto: UpdateVoteDto,
  ) {
    return this.voteService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.voteService.remove(+id);
  }
}
