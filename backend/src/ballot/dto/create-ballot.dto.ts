import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateBallotDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  allowWriteIn: boolean;

  @IsNotEmpty()
  @IsNumber()
  societyId: number;
}
