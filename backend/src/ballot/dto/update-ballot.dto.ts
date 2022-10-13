import { PartialType } from '@nestjs/mapped-types';
import { CreateBallotDto } from './create-ballot.dto';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class UpdateBallotDto extends PartialType(CreateBallotDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  allowWriteIn: boolean;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
