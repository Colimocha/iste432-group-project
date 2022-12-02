import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyDto, UpdateSocietyDto } from './dto';

@Injectable()
export class SocietyService {
  constructor(private readonly prisma: PrismaService) {}
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

  async remove(id: number) {
    if (!this.findOne(id)) throw new BadRequestException('Society not found');
    return this.prisma.society.delete({ where: { id } });
  }
}
