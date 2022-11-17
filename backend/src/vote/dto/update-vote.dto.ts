import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteDto } from '.';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
