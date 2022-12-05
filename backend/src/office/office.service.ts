import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOfficeDto, UpdateOfficeDto } from './dto';

/**
 * a class that contains the business logic for handling the office data and pass it to the controller
 *
 * @class OfficeService
 */
@Injectable()
export class OfficeService {
  /**
   * a constructor for office service
   *
   * @param prisma
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Create an office with the CreateOfficeDto object
   *
   * @param createOfficeDto
   * @returns
   */
  async create(createOfficeDto: CreateOfficeDto) {
    await this.ballotExists(createOfficeDto.ballotId);
    return await this.prisma.office.create({
      data: createOfficeDto,
      select: {
        id: true,
        name: true,
        limit: true,
        createdAt: true,
        ballot: { select: { id: true, name: true } },
        _count: { select: { Candidate: true } },
        Candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
          },
        },
      },
    });
  }

  /**
   * Return all offices from database
   *
   * @returns
   */
  async findAll() {
    return await this.prisma.office
      .findMany({
        select: {
          id: true,
          name: true,
          limit: true,
          createdAt: true,
          ballot: { select: { id: true, name: true } },
          _count: { select: { Candidate: true } },
        },
      })
      .then((offices) => offices.sort((a, b) => a.id - b.id));
  }

  /**
   * return the specific office with the id
   *
   * @param id
   * @returns
   */
  async findOne(id: number) {
    return await this.prisma.office.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        limit: true,
        createdAt: true,
        ballotId: true,
        ballot: { select: { id: true, name: true } },
        _count: { select: { Candidate: true } },
        Candidate: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
          },
        },
      },
    });
  }

  /**
   * update the office with the id and the updateoOfficeDto object
   *
   * @param id
   * @param updateOfficeDto
   * @returns
   */
  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    await this.prisma.office.findUnique({ where: { id } });
    return await this.prisma.office.update({
      where: { id },
      data: updateOfficeDto,
      select: {
        id: true,
        name: true,
        limit: true,
        createdAt: true,
        updatedAt: true,
        ballot: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * remove the office from the database
   *
   * @param id
   * @returns
   */
  async remove(id: number) {
    if (!this.findOne(id)) throw new BadRequestException('Office not found');
    return await this.prisma.office.delete({ where: { id } });
  }

  /**
   * Check if a ballot exists or not
   *
   * @param id
   */
  private async ballotExists(id: number) {
    const ballot = await this.prisma.ballot.findUnique({ where: { id } });
    if (!ballot) throw new BadRequestException('Ballot not found');
  }
}
