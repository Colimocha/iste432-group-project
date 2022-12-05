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
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { SocietyService } from './society.service';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';

/**
 * A controller that handle the requests for society from the frontend
 * 
 * @class SocietyController
 */
@Controller('society')
@UseGuards(JwtGuard)
export class SocietyController {
  /**
   * a constructor for the society controller
   * 
   * @param societyService 
   * @constructor
   */
  constructor(private readonly societyService: SocietyService) {}

  @Post()
  create(@Body() createSocietyDto: CreateSocietyDto) {
    return this.societyService.create(createSocietyDto);
  }

  @Get()
  findAll() {
    return this.societyService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.societyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateSocietyDto: UpdateSocietyDto,
  ) {
    return this.societyService.update(+id, updateSocietyDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.societyService.remove(+id);
  }
}
