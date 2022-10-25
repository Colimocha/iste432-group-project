import { PrismaService } from '../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoterDto, UpdateVoterDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class VotersService {
  constructor(private prisma: PrismaService) {}

  async create(createVoterDto: CreateVoterDto) {
    const {
      firstName,
      lastName,
      credential_1,
      credential_2,
      dateOfBirth,
      societyId,
    } = createVoterDto;

    const hash_credential_2 = await argon.hash(credential_2);

    const created = await this.prisma.voter.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        credential_1: credential_1,
        credential_2: hash_credential_2,
        dateofbirth: dateOfBirth,
        societyId: societyId,
      },
    });
    if (!created) throw new BadRequestException('Voter not created');

    return created;
  }

  async findAll() {
    return await this.prisma.voter.findMany();
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('No id provided');
    const found = await this.prisma.voter.findUnique({ where: { id: id } });
    if (!found) throw new BadRequestException('Voter not found');
    return found;
  }

  async update(id: number, updateVoterDto: UpdateVoterDto) {
    if (!id) throw new BadRequestException('No id provided');

    const found = await this.prisma.voter.findUnique({ where: { id: id } });
    if (!found) throw new BadRequestException('Voter not found');

    const {
      firstName,
      lastName,
      credential_1,
      credential_2,
      dateOfBirth,
      societyId,
    } = updateVoterDto;

    const hash_credential_2 = await argon.hash(credential_2);

    const updated = await this.prisma.voter.update({
      where: { id: id },
      data: {
        firstname: firstName,
        lastname: lastName,
        credential_1: credential_1,
        credential_2: hash_credential_2,
        dateofbirth: dateOfBirth,
        societyId: societyId,
      },
    });
    if (!updated) throw new BadRequestException('Voter not updated');
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('No id provided');
    const found = await this.prisma.voter.findUnique({ where: { id: id } });
    if (!found) throw new BadRequestException('Voter not found');
    const removed = await this.prisma.voter.delete({ where: { id: id } });
    return removed;
  }
}
