import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateSocietyContactDto } from '.';

export class UpdateSocietyContactDto extends PartialType(
  CreateSocietyContactDto,
) {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
