import { Role } from '../role/role.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmployeeJwtStrategy extends PassportStrategy(
  Strategy,
  'employee',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(Role.Employee),
    });
  }

  /**
   * Author: Xiangyu Shi
   * Description: This method is used to verify the JWT token.
   * @param payload The payload of the JWT token.
   * @returns The employee object.
   */
  async validate(payload: { id: number }) {
    const { id } = payload;
    const data = await this.prisma.employee.findUnique({
      where: { id: id },
    });
    delete data.password;
    return data;
  }
}
