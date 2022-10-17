import { IsString, IsNotEmpty } from 'class-validator';

export class EmployeeAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
