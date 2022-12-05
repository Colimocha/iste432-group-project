import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

/**
 * A class that is used to create a ballot
 * 
 * @class CreateBallotDto
 */
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

  @IsOptional()
  @IsString()
  start_date: string;

  @IsOptional()
  @IsString()
  end_date: string;
}
