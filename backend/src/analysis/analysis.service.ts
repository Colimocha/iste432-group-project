import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

/**
 * A class that contains the count of every records including employees, voters, and other more.
 *
 * @class AnalysisService
 */
@Injectable()
export class AnalysisService {
  /**
   * @constructor
   * @param prisma - Prisma object that can access to the database
   * @return list - a list that hold the number of every records
   */
  constructor(private prisma: PrismaService) {}

  async getStat() {
    // Accessing to the prisma object to get the records and get their counts
    const employees = await this.prisma.employee.count();
    const societyContacts = await this.prisma.societyContact.count();
    const voters = await this.prisma.voter.count();
    const societies = await this.prisma.society.count();
    const ballots = await this.prisma.ballot.count();
    const offices = await this.prisma.office.count();
    const candidates = await this.prisma.candidate.count();
    const votes = await this.prisma.vote.count();

    const ballot_completed = 'WIP';
    const ballot_incomplete = 'WIP';

    return {
      employees,
      societyContacts,
      voters,
      societies,
      ballots,
      offices,
      candidates,
      votes,
      ballot_completed,
      ballot_incomplete,
    };
  }
}
