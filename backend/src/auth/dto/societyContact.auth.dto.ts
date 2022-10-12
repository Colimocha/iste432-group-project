import { IsNotEmpty, IsString } from 'class-validator';

export class SCAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
