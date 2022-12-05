import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteDto } from '.';

/**
 * A class that update a vote, inheriting from CreateVoteDto
 *
 * @class UpdateVoteDto
 */
export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
