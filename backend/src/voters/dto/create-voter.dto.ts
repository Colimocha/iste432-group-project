import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVoterDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  credential_1?: string;

  @IsString()
  credential_2?: string;

  @IsDate()
  dateOfBirth?: Date;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
