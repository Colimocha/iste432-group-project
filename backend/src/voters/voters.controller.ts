import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VotersService } from './voters.service';
import { CreateVoterDto, UpdateVoterDto } from './dto';

@Controller('voters')
export class VotersController {
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
  findOne(@Param('id') id: string) {
    return this.votersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoterDto: UpdateVoterDto) {
    return this.votersService.update(+id, updateVoterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votersService.remove(+id);
  }
}
