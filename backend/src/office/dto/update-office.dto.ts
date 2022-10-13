import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOfficeDto } from '.';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  ballotId: number;
}
