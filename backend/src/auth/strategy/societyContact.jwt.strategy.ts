import { Role } from '../role/role.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SocietyContactJwtStrategy extends PassportStrategy(
  Strategy,
  'societyContact',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(Role.SocietyContact),
    });
  }

  /**
   * Author: Xiangyu Shi
   * Description: This method is used to verify the JWT token.
   * @param payload The payload of the JWT token.
   * @returns The society contact object.
   */
  async validate(payload: { sub: number }) {
    const { sub } = payload;
    const data = await this.prisma.societyContact.findUnique({
      where: { id: sub },
    });
    delete data.password;
    return data;
  }
}
