import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * A class that create a voter
 * 
 * @class CreateVoterDto
 */
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
  @IsDateString()
  dateOfBirth?: string;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
