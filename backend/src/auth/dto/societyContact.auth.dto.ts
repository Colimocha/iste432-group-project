import { IsNotEmpty, IsString } from 'class-validator';

export class SCAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
