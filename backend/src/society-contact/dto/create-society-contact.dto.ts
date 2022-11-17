import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSocietyContactDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  societyId: number;
}
