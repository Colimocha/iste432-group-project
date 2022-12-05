import { IsNotEmpty, IsString } from 'class-validator';

/**
 * A class with list of properties for voter login
 * 
 * @class VoterAuthDto
 */
export class VoterAuthDto {
  @IsNotEmpty()
  @IsString()
  cred_1: string;

  @IsNotEmpty()
  @IsString()
  cred_2: string;
}
