import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyDto, UpdateSocietyDto } from './dto';

/**
 * A class that contains the business logic for handling the society data and pass it to the controller
 * 
 * @class SocietyService
 */
@Injectable()
export class SocietyService {
  /**
   * a constructor for the society service
   * 
   * @param prisma 
   * @constructor
   */
  constructor(private readonly prisma: PrismaService) {}
  
  /**
   * create a society with the CreateSocietyDto object
   * 
   * @param createSocietyDto 
   * @returns 
   */
  async create(createSocietyDto: CreateSocietyDto) {
    return this.prisma.society.create({
      data: createSocietyDto,
      select: {
        id: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            Ballot: true,
            SocietyContact: true,
            Voter: true,
          },
        },
        Ballot: {
          select: {
            id: true,
            name: true,
            allowWriteIn: true,
            start_date: true,
            end_date: true,
          },
        },
        SocietyContact: {
          select: {
            id: true,
            username: true,
          },
        },
        Voter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  /**
   * Get all societies from the database
   * 
   * @returns 
   */
  async findAll() {
    return this.prisma.society
      .findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          _count: {
            select: {
              Ballot: true,
              SocietyContact: true,
              Voter: true,
            },
          },
        },
      })
      .then((societies) => societies.sort((a, b) => a.id - b.id));
  }

  /**
   * Get the specific society with the id
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return this.prisma.society.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            Ballot: true,
            SocietyContact: true,
            Voter: true,
          },
        },
        Ballot: {
          select: {
            id: true,
            name: true,
            allowWriteIn: true,
            start_date: true,
            end_date: true,
          },
        },
        SocietyContact: {
          select: {
            id: true,
            username: true,
          },
        },
        Voter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  /**
   * update the society with the id and the UpdateSocietyDto object
   * 
   * @param id 
   * @param updateSocietyDto 
   * @returns 
   */
  async update(id: number, updateSocietyDto: UpdateSocietyDto) {
    return this.prisma.society.update({
      where: { id },
      data: updateSocietyDto,
      select: {
        id: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            Ballot: true,
            SocietyContact: true,
            Voter: true,
          },
        },
        Ballot: {
          select: {
            id: true,
            name: true,
            allowWriteIn: true,
            start_date: true,
            end_date: true,
          },
        },
        SocietyContact: {
          select: {
            id: true,
            username: true,
          },
        },
        Voter: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  /**
   * Remove the society from the database
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    if (!this.findOne(id)) throw new BadRequestException('Society not found');
    return this.prisma.society.delete({ where: { id } });
  }
}
