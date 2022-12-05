import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyContactDto } from '.';

/**
 * A class that update the society contact, inheriting from CreateSocietyContactDto class
 * 
 * @class UpdateSocietyContactDto
 */
export class UpdateSocietyContactDto extends PartialType(
  CreateSocietyContactDto,
) {}
