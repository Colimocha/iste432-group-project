import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCandidateDto } from '.';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  officeId: number;

  @IsNumber()
  @IsNotEmpty()
  ballotId: number;
}
