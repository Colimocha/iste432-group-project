import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyContactDto, UpdateSocietyContactDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class SocietyContactService {
  constructor(private prisma: PrismaService) {}
  async create(createSocietyContactDto: CreateSocietyContactDto) {
    await this.societyExists(createSocietyContactDto.societyId);
    const { password, ...societyContact } = createSocietyContactDto;
    const hashedPassword = await argon.hash(password);
    return await this.prisma.societyContact.create({
      data: { ...societyContact, password: hashedPassword },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.societyContact
      .findMany({
        select: {
          id: true,
          username: true,
          createdAt: true,
          society: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .then((societyContacts) => societyContacts.sort((a, b) => a.id - b.id));
  }

  async findOne(id: number) {
    return await this.prisma.societyContact.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        createdAt: true,
        society: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateSocietyContactDto: UpdateSocietyContactDto) {
    await this.societyExists(updateSocietyContactDto.societyId);
    const { password, ...societyContact } = updateSocietyContactDto;
    let hashedPassword = '';
    if (password) hashedPassword = await argon.hash(password);

    return await this.prisma.societyContact.update({
      where: { id },
      data: password
        ? { ...societyContact, password: hashedPassword }
        : { ...societyContact },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Society contact not found');
    return await this.prisma.societyContact.delete({ where: { id } });
  }

  private async societyExists(id: number) {
    const society = await this.prisma.society.findUnique({ where: { id } });
    if (!society) throw new BadRequestException('Society not found');
  }
}
