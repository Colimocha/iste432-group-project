import { Role } from '../role/role.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VoterJwtStrategy extends PassportStrategy(Strategy, 'voter') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(Role.Voter),
    });
  }

  /**
   * Author: Xiangyu Shi
   * Description: This method is used to verify the JWT token.
   * @param payload The payload of the JWT token.
   * @returns The voter object.
   */
  async validate(payload: { id: number }) {
    const { id } = payload;
    const voter = await this.prisma.voter.findUnique({ where: { id: id } });
    delete voter.credential_1;
    delete voter.credential_2;
    return voter;
  }
}
