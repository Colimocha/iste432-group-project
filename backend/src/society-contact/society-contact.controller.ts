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
import { SocietyContactService } from './society-contact.service';
import { CreateSocietyContactDto } from './dto/create-society-contact.dto';
import { UpdateSocietyContactDto } from './dto/update-society-contact.dto';

/**
 * A controller that handle the request for society contact from the frontend
 *
 * @class SocietyContactController
 */
@Controller('societycontact')
@UseGuards(JwtGuard)
export class SocietyContactController {
  /**
   * a constructor for society contact controller
   *
   * @param societyContactService
   * @constructor
   */
  constructor(private readonly societyContactService: SocietyContactService) {}

  @Post()
  create(@Body() createSocietyContactDto: CreateSocietyContactDto) {
    return this.societyContactService.create(createSocietyContactDto);
  }

  @Get()
  findAll() {
    return this.societyContactService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.societyContactService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body() updateSocietyContactDto: UpdateSocietyContactDto,
  ) {
    return this.societyContactService.update(+id, updateSocietyContactDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.societyContactService.remove(+id);
  }
}
