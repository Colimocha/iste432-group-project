import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOfficeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  ballotId: number;
}
