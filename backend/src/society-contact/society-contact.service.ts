import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyContactDto, UpdateSocietyContactDto } from './dto';
import * as argon from 'argon2';

/**
 * A service that handle the society contact data and pass it to controller
 *
 * @class SocietyContactService
 */
@Injectable()
export class SocietyContactService {
  /**
   * A constructor for the society contact service
   *
   * @param prisma
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Create a society contact with the CreateSocietyContactDto object
   *
   * @param createSocietyContactDto
   * @returns
   */
  async create(createSocietyContactDto: CreateSocietyContactDto) {
    await this.societyExists(createSocietyContactDto.societyId);
    const { password, ...societyContact } = createSocietyContactDto;
    const hashedPassword = await argon.hash(password);
    return await this.prisma.societyContact.create({
      data: { ...societyContact, password: hashedPassword },
    });
  }

  /**
   * Return all society contacts from the database
   *
   * @returns
   */
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

  /**
   * Return the specific society contact with the id
   *
   * @param id
   * @returns
   */
  async findOne(id: number) {
    return await this.prisma.societyContact.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        societyId: true,
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

  /**
   * Update the society contact with the id and new data via UpdateSocietyContactDto object
   *
   * @param id
   * @param updateSocietyContactDto
   * @returns
   */
  async update(id: number, updateSocietyContactDto: UpdateSocietyContactDto) {
    await this.societyExists(updateSocietyContactDto.societyId);
    const { password, ...societyContact } = updateSocietyContactDto;

    //Encrpyt the password for a security reason
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

  /**
   * Delete a society contact from the database
   *
   * @param id
   * @returns
   */
  async remove(id: number) {
    if (!this.findOne(id))
      throw new BadRequestException('Society contact not found');
    return await this.prisma.societyContact.delete({ where: { id } });
  }

  /**
   * Check if a society with the id exists or not
   *
   * @param id
   */
  private async societyExists(id: number) {
    const society = await this.prisma.society.findUnique({ where: { id } });
    if (!society) throw new BadRequestException('Society not found');
  }
}
