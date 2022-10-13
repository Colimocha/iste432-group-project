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
    const created = this.prisma.voter.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        credential_1: credential_1,
        credential_2: credential_2,
        dateofbirth: dateOfBirth,
        societyId: societyId,
      },
    });
    if (!created) throw new BadRequestException('Voter not created');

    return created;
  }

  findAll() {
    return this.prisma.voter.findMany();
  }

  findOne(id: number) {
    if (!id) throw new BadRequestException('No id provided');

    const found = this.prisma.voter.findUnique({ where: { id: id } });
    if (!found) throw new BadRequestException('Voter not found');
    return found;
  }

  update(id: number, updateVoterDto: UpdateVoterDto) {
    if (!id) throw new BadRequestException('No id provided');

    const {
      firstName,
      lastName,
      credential_1,
      credential_2,
      dateOfBirth,
      societyId,
    } = updateVoterDto;

    const updated = this.prisma.voter.update({
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
    if (!updated) throw new BadRequestException('Voter not updated');
    return updated;
  }

  remove(id: number) {
    if (!id) throw new BadRequestException('No id provided');

    const removed = this.prisma.voter.delete({ where: { id: id } });
    if (!removed) throw new BadRequestException('Voter not deleted');
    return removed;
  }
}
