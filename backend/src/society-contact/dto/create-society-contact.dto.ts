import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSocietyContactDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  societyId: number;
}
