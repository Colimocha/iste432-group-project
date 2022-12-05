import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * A class that is used to create an office
 * 
 * @class CreateOfficeDto
 */
export class CreateOfficeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @IsNotEmpty()
  @IsNumber()
  ballotId: number;
}
