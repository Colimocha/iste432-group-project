import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBallotDto, UpdateBallotDto } from './dto';

/**
 * a class that contains the business logic for handling the ballot data and pass it back to the controller
 * 
 * @class BallotService
 */
@Injectable()
export class BallotService {
  /**
   * A constructor for the ballot service
   * 
   * @param prisma 
   * @constructor
   */
  constructor(private prisma: PrismaService) {}

  /**
   * create a ballot with the createBallotDto object
   * 
   * @param createBallotDto 
   * @returns 
   */
  async create(createBallotDto: CreateBallotDto) {
    await this.societyExists(createBallotDto.societyId);
    return await this.prisma.ballot.create({
      data: createBallotDto,
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * Get all ballots in the database
   * 
   * @returns 
   */
  async findAll() {
    return await this.prisma.ballot.findMany({
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        society: { select: { id: true, name: true } },
        _count: { select: { Vote: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * Get specific ballot via its id
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return await this.prisma.ballot.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        societyId: true,
        society: { select: { id: true, name: true } },
        Office: {
          select: {
            id: true,
            name: true,
            limit: true,
            Candidate: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
                image: true,
              },
            },
          },
        },
        Vote: true,
        _count: { select: { Vote: true } },
      },
    });
  }

  /**
   * Get multiple ballots with the society id
   * 
   * @param societyId 
   * @returns 
   */
  async findManyBySocietyId(societyId: number) {
    return (
      await this.prisma.ballot.findMany({
        where: { societyId },
        select: {
          id: true,
          name: true,
          allowWriteIn: true,
          start_date: true,
          end_date: true,
          createdAt: true,
          societyId: true,
          society: { select: { id: true, name: true } },
          Office: {
            select: {
              id: true,
              name: true,
              limit: true,
              Candidate: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  title: true,
                  image: true,
                },
              },
            },
          },
          Vote: true,
          _count: { select: { Vote: true } },
        },
        orderBy: { id: 'asc' },
      })
    ).filter((ballot) => {
      if (ballot.end_date !== null)
        return new Date(ballot.end_date) > new Date();
      return true;
    });
  }

  /**
   * Update a specific ballot with the id and new data
   * 
   * @param id 
   * @param updateBallotDto 
   * @returns 
   */
  async update(id: number, updateBallotDto: UpdateBallotDto) {
    await this.societyExists(updateBallotDto.societyId);
    return await this.prisma.ballot.update({
      where: { id },
      data: updateBallotDto,
      select: {
        id: true,
        name: true,
        allowWriteIn: true,
        start_date: true,
        end_date: true,
        createdAt: true,
        updatedAt: true,
        society: { select: { id: true, name: true } },
      },
    });
  }

  /**
   * Get the vote result for this specific ballot with id
   * 
   * @param id 
   * @returns 
   */
  async getVoteResult(id: number) {
    const ballot = await this.findOne(id);
    const offices = ballot.Office;
    const vote = ballot.Vote;
    const map = new Map();

    //if there is no offices (no vote yet)
    if (!offices.length) return { result: [] };

    //creating a map for the office + candidates
    for (const office of offices) {
      map[office.name] = {};
      for (const candidate of office.Candidate) {
        map[office.name][candidate.id] = {
          full_name: `${candidate.firstName} ${candidate.lastName}`,
          votes: 0,
        };
      }
    }

    //reading through the map to count the amount of votes for every candidate
    vote.forEach((v) => {
      const json = JSON.parse(v.result).result;
      for (const [key, value] of Object.entries(json)) {
        if (Array.isArray(value)) {
          for (const v of value) map[key][v].votes++;
          continue;
        }
        map[key][value].votes++;
      }
    });

    // get total votes into map
    for (const [key, value] of Object.entries(map)) {
      let total = 0;
      for (const [, v] of Object.entries(value)) {
        total += v['votes'];
      }
      map[key]['total'] = total;
    }

    // Convert map to object
    const object = [];
    for (const [key, value] of Object.entries(map)) {
      const candidates = [];
      for (const [k, v] of Object.entries(value)) {
        if (k !== 'total') candidates.push(v);
      }
      object.push({ office: key, candidates, total: value['total'] });
    }

    return { result: object };
  }

  /**
   * remove a ballot from the database with the id
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    if (!(await this.findOne(id)))
      throw new BadRequestException('Ballot does not exist');
    return await this.prisma.ballot.delete({ where: { id } });
  }

  /**
   * Check if the specific society exists or not
   * 
   * @param id 
   */
  private async societyExists(id: number) {
    const found = await this.prisma.society.findUnique({ where: { id } });
    if (!found) throw new BadRequestException('Society does not exist');
  }
}
