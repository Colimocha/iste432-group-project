import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyDto } from './create-society.dto';

/**
 * A class that update the society, inheriting from CreateSocietyDto
 * 
 * @class UpdateSocietyDto
 */
export class UpdateSocietyDto extends PartialType(CreateSocietyDto) {}
