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
} from '@nestjs/common';
import { SocietyContactService } from './society-contact.service';
import { CreateSocietyContactDto } from './dto/create-society-contact.dto';
import { UpdateSocietyContactDto } from './dto/update-society-contact.dto';

@Controller('societycontact')
@UseGuards(JwtGuard)
export class SocietyContactController {
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
  findOne(@Param('id') id: string) {
    return this.societyContactService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocietyContactDto: UpdateSocietyContactDto,
  ) {
    return this.societyContactService.update(+id, updateSocietyContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.societyContactService.remove(+id);
  }
}
