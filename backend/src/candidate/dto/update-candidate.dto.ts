import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from '.';

/**
 * A class that update the candidate, inheriting from CreateCandidateDto
 * 
 * @class UpdateCandidateDto
 */
export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}
