import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoteDto, UpdateVoteDto } from './dto';
import { nanoid } from 'nanoid';

/**
 * A class that contains the business logic for handling the vote data
 * 
 * @class VoteService
 */
@Injectable()
export class VoteService {
  /**
   * a constructor for the vote service
   * 
   * @param prisma 
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * create a vote with the CreateVoteDto object
   * 
   * @param createVoteDto 
   * @returns 
   */
  async create(createVoteDto: CreateVoteDto) {
    await this.ballotExists(createVoteDto.ballotId);
    const vote = await this.prisma.vote.create({
      data: {
        ...createVoteDto,
        submit_guid: nanoid(7),
      },
    });
    return vote;
  }

  /**
   * Return all votes 
   * 
   * @returns 
   */
  async findAll() {
    return await this.prisma.vote
      .findMany()
      .then((votes) => votes.sort((a, b) => a.id - b.id));
  }

  /**
   * Get specific vote with the id
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return await this.prisma.vote.findUnique({ where: { id } });
  }

  /**
   * Update the vote with the id via the UpdateVoteDto object
   * 
   * @param id 
   * @param updateVoteDto 
   * @returns 
   */
  async update(id: number, updateVoteDto: UpdateVoteDto) {
    await this.prisma.vote.findUnique({ where: { id } });
    return await this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }

  /**
   * Delete a vote with the id from database
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    if (!this.findOne(id)) throw new BadRequestException('Vote not found');
    return await this.prisma.vote.delete({ where: { id } });
  }

  /**
   * Check if a ballot with the id exists or not
   * 
   * @param id 
   */
  private async ballotExists(id: number) {
    const ballot = await this.prisma.ballot.findUnique({ where: { id } });
    if (!ballot) throw new BadRequestException('Ballot not found');
  }
}
