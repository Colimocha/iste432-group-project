import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

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
