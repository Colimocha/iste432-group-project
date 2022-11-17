import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVoterDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  credential_1?: string;

  @IsOptional()
  @IsString()
  credential_2?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: string;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
