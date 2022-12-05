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
import { VotersService } from './voter.service';
import { CreateVoterDto, UpdateVoterDto } from './dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

/**
 * A controller that handles the requests for the voter from the frontend
 *
 * @class VotersController
 */
@Controller('voter')
@UseGuards(JwtGuard)
export class VotersController {
  /**
   * a constructor for the voter controller
   *
   * @param votersService
   * @constructor
   */
  constructor(private readonly votersService: VotersService) {}

  @Post()
  create(@Body() createVoterDto: CreateVoterDto) {
    return this.votersService.create(createVoterDto);
  }

  @Get()
  findAll() {
    return this.votersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.votersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateVoterDto: UpdateVoterDto,
  ) {
    return this.votersService.update(+id, updateVoterDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.votersService.remove(+id);
  }
}
