import { Role } from '../role/role.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  /**
   * Author: Xiangyu Shi
   * Description: This method is used to verify the JWT token.
   * @param payload The payload of the JWT token.
   * @returns The voter object.
   */
  async validate(payload: { sub: number; role: Role }) {
    const { sub, role } = payload;
    let data;
    if (role === Role.Voter) {
      data = await this.prisma.voter.findUnique({
        where: { id: sub },
      });
      delete data.credential_1;
      delete data.credential_2;
    } else if (role === Role.SocietyContact) {
      data = await this.prisma.societyContact.findUnique({
        where: { id: sub },
      });
      delete data.password;
    } else if (role === Role.Employee) {
      data = await this.prisma.employee.findUnique({
        where: { id: sub },
      });
      delete data.password;
    }
    return data;
  }
}
