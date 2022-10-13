import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocietyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
