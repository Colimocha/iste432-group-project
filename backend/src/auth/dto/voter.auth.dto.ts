import { IsNotEmpty, IsString } from 'class-validator';

export class VoterAuthDto {
  @IsNotEmpty()
  @IsString()
  cred_1: string;

  @IsNotEmpty()
  @IsString()
  cred_2: string;
}
