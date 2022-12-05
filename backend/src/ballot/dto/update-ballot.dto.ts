import { PartialType } from '@nestjs/mapped-types';
import { CreateBallotDto } from './create-ballot.dto';

/**
 * A class that update the ballot, inheriting some from CreateBallotDto class
 *
 * @class UpdateBallotDto
 */
export class UpdateBallotDto extends PartialType(CreateBallotDto) {}
