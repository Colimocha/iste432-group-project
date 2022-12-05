import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


/**
 * A class that is used to create a candidate
 * 
 * @class CreateCandidateDto
 */
export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  officeId: number;

  @IsNotEmpty()
  @IsNumber()
  ballotId: number;
}
