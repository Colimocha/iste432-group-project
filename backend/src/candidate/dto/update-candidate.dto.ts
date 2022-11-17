import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from '.';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}
