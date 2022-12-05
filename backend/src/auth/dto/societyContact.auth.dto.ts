import { IsNotEmpty, IsString } from 'class-validator';

/**
 * A class with list of properties for society contact login
 *
 * @class SCAuthDto
 */
export class SCAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
