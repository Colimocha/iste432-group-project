import { IsString, IsNotEmpty } from 'class-validator';

export class EmployeeAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
