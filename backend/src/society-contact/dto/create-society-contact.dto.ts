import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * A class that create the society contact
 * 
 * @class CreateSocietyContactDto
 */
export class CreateSocietyContactDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  societyId: number;
}
