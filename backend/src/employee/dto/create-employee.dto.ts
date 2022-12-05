import { IsString, IsNotEmpty } from 'class-validator';

/**
 * A class that is used to create an employee
 * 
 * @class CreateEmployeeDto
 */
export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
