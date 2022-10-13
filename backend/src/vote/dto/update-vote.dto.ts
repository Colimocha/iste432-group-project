import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { CreateVoteDto } from '.';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {
  @IsBoolean()
  @IsNotEmpty()
  voted: boolean;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsNotEmpty()
  submit_guid: string;

  @IsBoolean()
  @IsNotEmpty()
  isWriteIn: boolean;

  @IsNumber()
  @IsNotEmpty()
  ballotId: number;
}
