import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
