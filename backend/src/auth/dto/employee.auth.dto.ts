import { IsString, IsNotEmpty } from 'class-validator';

/**
 * A class with list of properties for employee login
 *
 * @class EmployeeAuthDto
 */
export class EmployeeAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
