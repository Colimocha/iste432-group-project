import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';

/**
 * A class taht update the employee, inheriting from CreateEmployeeDto class
 *
 * @class UpdateEmployeeDto
 */
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
