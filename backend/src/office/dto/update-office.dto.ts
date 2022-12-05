import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeDto } from '.';

/**
 * A class that update the office, inheriting from CreateOfficeDto class
 * 
 * @class UpdateOfficeDto 
*/
export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {}
