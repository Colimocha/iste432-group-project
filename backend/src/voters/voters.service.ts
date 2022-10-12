import { PrismaService } from './../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVoterDto, UpdateVoterDto } from './dto';

@Injectable()
export class VotersService {
  constructor(private prisma: PrismaService) {}

  create(createVoterDto: CreateVoterDto) {
    const {
      firstName,
      lastName,
      credential_1,
      credential_2,
      dateOfBirth,
      societyId,
    } = createVoterDto;
    const voter = this.prisma.voter.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        credential_1: credential_1,
        credential_2: credential_2,
        dateofbirth: dateOfBirth,
        societyId: societyId,
      },
    });
    if (!voter) throw new BadRequestException('Voter not created');

    return voter;
  }

  findAll() {
    const voters = this.prisma.voter.findMany();
    if (!voters) throw new BadRequestException('No voters found');
    return voters;
  }

  findOne(id: number) {
    const voter = this.prisma.voter.findUnique({ where: { id: id } });
    if (!voter) throw new BadRequestException('Voter not found');
    return voter;
  }

  update(id: number, updateVoterDto: UpdateVoterDto) {
    const {
      firstName,
      lastName,
      credential_1,
      credential_2,
      dateOfBirth,
      societyId,
    } = updateVoterDto;

    const voter = this.prisma.voter.update({
      where: { id: id },
      data: {
        firstname: firstName,
        lastname: lastName,
        credential_1: credential_1,
        credential_2: credential_2,
        dateofbirth: dateOfBirth,
        societyId: societyId,
      },
    });
    if (!voter) throw new BadRequestException('Voter not updated');
    return voter;
  }

  remove(id: number) {
    const voter = this.prisma.voter.delete({ where: { id: id } });
    if (!voter) throw new BadRequestException('Voter not deleted');
    return voter;
  }
}
