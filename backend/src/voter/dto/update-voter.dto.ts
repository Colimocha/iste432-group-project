import { PartialType } from '@nestjs/mapped-types';
import { CreateVoterDto } from './create-voter.dto';

/**
 * A class that update a voter, inheriting from CreateVoterDto class
 *
 * @class UpdateVoterDto
 */
export class UpdateVoterDto extends PartialType(CreateVoterDto) {}
