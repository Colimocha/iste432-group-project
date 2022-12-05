import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCandidateDto, UpdateCandidateDto } from './dto';

/**
 * a class that contains the business logic forhandling the data and pass it back to the controller
 * 
 * @class CandidateService
 */
@Injectable()
export class CandidateService {
  /**
   * A constructor for the candidate service
   * 
   * @param prisma 
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * create a candidate with the createCandidateDto object
   * 
   * @param createCandidateDto 
   * @returns 
   */
  async create(createCandidateDto: CreateCandidateDto) {
    await this.ballotExists(createCandidateDto.ballotId);
    await this.officeExists(createCandidateDto.officeId);
    return await this.prisma.candidate.create({
      data: createCandidateDto,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        image: true,
        createdAt: true,
        office: { select: { id: true, name: true } },
        ballot: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * return all candidates
   * 
   * @returns 
   */
  async findAll() {
    return this.prisma.candidate
      .findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          title: true,
          image: true,
          createdAt: true,
          office: { select: { id: true, name: true } },
          ballot: { select: { id: true, name: true } },
        },
      })
      .then((candidates) => candidates.sort((a, b) => a.id - b.id));
  }

  /**
   * Get the candidate with the id
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return this.prisma.candidate.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        image: true,
        officeId: true,
        ballotId: true,
        createdAt: true,
        office: { select: { id: true, name: true } },
        ballot: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * update a candidate with the id and new data via updateCandidateDto object
   * 
   * @param id 
   * @param updateCandidateDto 
   * @returns 
   */
  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    await this.ballotExists(updateCandidateDto.ballotId);
    await this.officeExists(updateCandidateDto.officeId);
    return await this.prisma.candidate.update({
      where: { id },
      data: updateCandidateDto,
    });
  }

  /**
   * Remove the candidate from database
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Candidate does not exist');
    return await this.prisma.candidate.delete({ where: { id } });
  }

  /**
   * Check if the ballot exists or not
   * 
   * @param id 
   */
  private async ballotExists(id: number) {
    const found = await this.prisma.ballot.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Ballot does not exist');
  }

  /**
   * Check if the office exists or not
   * 
   * @param id 
   */
  private async officeExists(id: number) {
    const found = await this.prisma.office.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Office does not exist');
  }
}
