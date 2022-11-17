import { PartialType } from '@nestjs/mapped-types';
import { CreateSocietyContactDto } from '.';

export class UpdateSocietyContactDto extends PartialType(
  CreateSocietyContactDto,
) {}
