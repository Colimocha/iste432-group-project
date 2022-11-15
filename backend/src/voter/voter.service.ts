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

    const society_found = await this.prisma.society.findUnique({
      where: { id: createVoterDto.societyId },
    });
    if (!society_found)
      throw new BadRequestException(
        `The society ${createVoterDto.societyId} not found`,
      );

    const hash_credential_2 = await argon.hash(credential_2);

    const created = await this.prisma.voter.create({
      data: {
        firstName,
        lastName,
        credential_1,
        credential_2: hash_credential_2,
        dateOfBirth,
        societyId,
      },
    });
    if (!created) throw new BadRequestException('Voter not created');
    delete created.credential_2;
    return created;
  }

  async findAll() {
    const found = await this.prisma.voter.findMany();
    if (found.length) found.forEach((voter) => delete voter.credential_2);
    return found;
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('No id provided');
    const found = await this.prisma.voter.findUnique({ where: { id: id } });
    if (!found) throw new BadRequestException('Voter not found');
    delete found.credential_2;
    return found;
  }

  async update(id: number, updateVoterDto: UpdateVoterDto) {
    if (!id) throw new BadRequestException('No id provided');

    const society_found = await this.prisma.society.findUnique({
      where: { id: updateVoterDto.societyId },
    });
    if (!society_found)
      throw new BadRequestException(
        `The society ${updateVoterDto.societyId} not found`,
      );

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
        firstName,
        lastName,
        credential_1,
        credential_2: hash_credential_2,
        dateOfBirth,
        societyId,
      },
    });
    if (!updated) throw new BadRequestException('Voter not updated');
    delete updated.credential_2;
    return updated;
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('No id provided');
    const found = await this.prisma.voter.findUnique({ where: { id: id } });
    if (!found) throw new BadRequestException('Voter not found');
    const removed = await this.prisma.voter.delete({ where: { id: id } });
    delete removed.credential_2;
    return removed;
  }
}
