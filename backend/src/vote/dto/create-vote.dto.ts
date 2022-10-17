import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVoteDto {
  @IsBoolean()
  @IsNotEmpty()
  voted: boolean;

  @IsString()
  @IsNotEmpty()
  result: string;

  @IsString()
  @IsNotEmpty()
  submit_guid: string;

  @IsBoolean()
  @IsNotEmpty()
  isWriteIn: boolean;

  @IsNumber()
  @IsNotEmpty()
  ballotId: number;
}
