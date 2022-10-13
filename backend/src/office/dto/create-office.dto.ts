import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOfficeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  ballotId: number;
}
