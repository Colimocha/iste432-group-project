import { PrismaService } from '../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoterDto, UpdateVoterDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class VotersService {
  constructor(private prisma: PrismaService) {}

  async create(createVoterDto: CreateVoterDto) {
    await this.societyExists(createVoterDto.societyId);
    const { credential_2, ...voter } = createVoterDto;
    const hash_credential_2 = await argon.hash(credential_2);
    return await this.prisma.voter
      .create({
        data: { ...voter, credential_2: hash_credential_2 },
      })
      .then((voter) => {
        delete voter.credential_2;
        return voter;
      });
  }

  async findAll() {
    return await this.prisma.voter.findMany().then((voters) => {
      if (voters.length) {
        voters.forEach((voter) => {
          delete voter.credential_2;
        });
      }
      return voters;
    });
  }

  async findOne(id: number) {
    return await this.prisma.voter
      .findUnique({ where: { id: id } })
      .then((voter) => {
        if (voter) delete voter.credential_2;
        return voter;
      });
  }

  async update(id: number, updateVoterDto: UpdateVoterDto) {
    await this.societyExists(updateVoterDto.societyId);
    const { credential_2, ...voter } = updateVoterDto;
    const hash_credential_2 = await argon.hash(credential_2);
    return await this.prisma.voter
      .update({
        where: { id },
        data: { ...voter, credential_2: hash_credential_2 },
      })
      .then((voter) => {
        delete voter.credential_2;
        return voter;
      });
  }

  async remove(id: number) {
    if (this.findOne(id)) throw new BadRequestException('Voter does not exist');
    return await this.prisma.voter.delete({ where: { id } });
  }

  private async societyExists(societyId: number) {
    const found = await this.prisma.society.findUnique({
      where: { id: societyId },
    });
    if (!found) throw new BadRequestException(`Society not found`);
  }
}
