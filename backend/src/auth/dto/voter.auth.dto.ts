import { IsNotEmpty, IsString } from 'class-validator';

export class VoterAuthDto {
  @IsString()
  @IsNotEmpty()
  cred_1: string;

  @IsString()
  @IsNotEmpty()
  cred_2: string;
}
