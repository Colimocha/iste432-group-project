import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateBallotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  allowWriteIn: boolean;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
