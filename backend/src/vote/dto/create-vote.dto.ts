import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * A class that is used to create a vote
 *
 * @class CreateVoteDto
 */
export class CreateVoteDto {
  @IsNotEmpty()
  @IsBoolean()
  voted: boolean;

  @IsNotEmpty()
  @IsString()
  result: string;

  submit_guid: string;

  @IsNotEmpty()
  @IsBoolean()
  isWriteIn: boolean;

  @IsNotEmpty()
  @IsNumber()
  ballotId: number;
}
