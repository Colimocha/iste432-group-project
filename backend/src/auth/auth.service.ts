import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeAuthDto, SCAuthDto, VoterAuthDto } from './dto';
import * as argon from 'argon2';
import { Role } from './role';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * Author: Xiangyu Shi
   * Description: Generate JWT token
   * @param id - user id
   * @param role - user role
   * @returns - access token
   */
  async generateToken(id: number, role: string) {
    const secret = this.config.get(Role[role]);
    const payload = { sub: id };
    const options = { expiresIn: '1h', secret: secret };
    const token = await this.jwt.signAsync(payload, options);
    return { access_token: token };
  }

  /**
   * Author: Xiangyu Shi
   * Description: Voter login
   * @param dto VoterAuthDto - cred_1 and cred_2
   * @returns access token
   */
  async voterLogin(dto: VoterAuthDto) {
    const { cred_1, cred_2 } = dto;
    const voter = await this.prisma.voter.findFirst({
      where: { credential_1: cred_1, credential_2: cred_2 },
    });
    if (!voter) throw new ForbiddenException('Invalid credentials');

    return this.generateToken(voter.id, 'voter');
  }

  /**
   * Author: Xiangyu Shi
   * Description: Society contact login
   * @param dto SCAuthDto - username and password
   * @returns access token
   */
  async societyContactLogin(dto: SCAuthDto) {
    const { username, password } = dto;

    // find society contact by username
    const societyContact = await this.prisma.societyContact.findUnique({
      where: { username: username },
    });
    if (!societyContact) throw new ForbiddenException('Invalid credentials');

    // validate password
    const isMatchPwd = await argon.verify(societyContact.password, password);
    if (!isMatchPwd) throw new ForbiddenException('Invalid credentials');

    // return token
    return this.generateToken(societyContact.id, 'societyContact');
  }

  /**
   * Author: Xiangyu Shi
   * Description: Employee login
   * @param dto EmployeeAuthDto - username and password
   * @returns access token
   */
  async employeeLogin(dto: EmployeeAuthDto) {
    const { username, password } = dto;

    // find employee by username
    const employee = await this.prisma.employee.findUnique({
      where: { username: username },
    });
    if (!employee) throw new ForbiddenException('Invalid credentials');

    // validate password
    const isMatchPwd = argon.verify(employee.password, password);
    if (!isMatchPwd) throw new ForbiddenException('Invalid credentials');

    // return token
    return this.generateToken(employee.id, 'employee');
  }
}
