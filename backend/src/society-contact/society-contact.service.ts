import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocietyContactDto, UpdateSocietyContactDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class SocietyContactService {
  constructor(private prisma: PrismaService) {}
  async create(createSocietyContactDto: CreateSocietyContactDto) {
    const { username, password, societyId } = createSocietyContactDto;
    if (!username || !password)
      throw new BadRequestException('Username and password are required');

    const hashedPassword = await argon.hash(password);
    const created = await this.prisma.societyContact.create({
      data: { username, password: hashedPassword, societyId },
    });
    if (!created)
      throw new BadRequestException('Society Contact has existed already');

    delete created.password;
    return created;
  }

  async findAll() {
    const found = await this.prisma.societyContact.findMany();
    if (found.length)
      found.forEach((societyContact) => delete societyContact.password);
    return found;
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('The parameter id is required');

    const found = await this.prisma.societyContact.findUnique({
      where: { id },
    });
    if (!found) throw new BadRequestException('Society Contact not found');

    delete found.password;
    return found;
  }

  async update(id: number, updateSocietyContactDto: UpdateSocietyContactDto) {
    if (!id) throw new BadRequestException('The parameter id is required');

    const { username, password, societyId } = updateSocietyContactDto;
    let hashedPassword = undefined;
    if (password) hashedPassword = await argon.hash(password);
    const updated = await this.prisma.societyContact.update({
      where: { id },
      data: { username, password: hashedPassword, societyId },
    });
    if (!updated) throw new BadRequestException('Society Contact not updated');

    delete updated.password;
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('The parameter id is required');
    const deleted = await this.prisma.societyContact.delete({
      where: { id },
    });
    if (!deleted) throw new BadRequestException('Society Contact not deleted');

    delete deleted.password;
    return deleted;
  }
}
