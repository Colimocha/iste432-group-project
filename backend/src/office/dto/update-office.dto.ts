import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeDto } from '.';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {}
