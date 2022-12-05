import { PrismaService } from '../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoterDto, UpdateVoterDto } from './dto';
import * as argon from 'argon2';

/**
 * A class that contains the business logic for the voter data and pass it to controller
 * 
 * @class VotersService
 */
@Injectable()
export class VotersService {
  /**
   * a constructor for the voter service
   * 
   * @param prisma 
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Create a voter with the CreateVoterDto object
   * 
   * @param createVoterDto 
   * @returns 
   */
  async create(createVoterDto: CreateVoterDto) {
    await this.societyExists(createVoterDto.societyId);
    const { credential_2, ...voter } = createVoterDto;
    const hash_credential_2 = await argon.hash(credential_2);
    return await this.prisma.voter.create({
      data: { ...voter, credential_2: hash_credential_2 },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        createdAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * Return all voters from the database
   * 
   * @returns 
   */
  async findAll() {
    return await this.prisma.voter
      .findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          credential_1: true,
          dateOfBirth: true,
          createdAt: true,
          society: { select: { id: true, name: true } },
        },
      })
      .then((voters) => voters.sort((a, b) => a.id - b.id));
  }

  /**
   * Find specific voter with the id
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return await this.prisma.voter.findUnique({
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        credential_1: true,
        dateOfBirth: true,
        societyId: true,
        createdAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * update a voter with the id via the UpdateVoterDto object
   * 
   * @param id 
   * @param updateVoterDto 
   * @returns 
   */
  async update(id: number, updateVoterDto: UpdateVoterDto) {
    await this.societyExists(updateVoterDto.societyId);
    return await this.prisma.voter.update({
      where: { id },
      data: { ...updateVoterDto },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        credential_1: true,
        dateOfBirth: true,
        createdAt: true,
        updatedAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * Delete a voter from the database
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Voter does not exist');
    return await this.prisma.voter.delete({ where: { id } });
  }

  /**
   * Check if the society with the id exists or not
   * 
   * @param societyId 
   */
  private async societyExists(societyId: number) {
    const found = await this.prisma.society.findUnique({
      where: { id: societyId },
    });
    if (!found) throw new BadRequestException(`Society not found`);
  }
}
