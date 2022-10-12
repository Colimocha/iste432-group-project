import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * Author: Xiangyu Shi
   * Description: Generate a JWT token
   * @param id club id
   * @param guid club guid
   * @param email club email
   * @returns token
   */
  async generateToken(id: number, guid: string, email: string) {
    const secret = this.config.get('JWT_SECRET');
    const payload = { sub: id, guid, email };
    const options = { expiresIn: '1h', secret: secret };
    const token = await this.jwt.signAsync(payload, options);
    return { access_token: token };
  }
}
