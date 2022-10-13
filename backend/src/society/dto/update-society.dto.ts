import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateSocietyDto } from './create-society.dto';

export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
