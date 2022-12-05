import { IsNotEmpty, IsString } from 'class-validator';

/**
 * A class that is used to create a society
 * 
 * @class CreateSocietyDto
 */
export class CreateSocietyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
