import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateVoterDto } from './create-voter.dto';

export class UpdateVoterDto extends PartialType(CreateVoterDto) {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  credential_1?: string;

  @IsString()
  credential_2?: string;

  @IsDate()
  dateOfBirth?: string;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
