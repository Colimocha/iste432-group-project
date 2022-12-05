import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeAuthDto, SCAuthDto, VoterAuthDto } from './dto';
import * as argon from 'argon2';
import { Role } from './role';

/**
 * A class that contains the business logic for the authentication service
 * 
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * a constructor for the authentication service
   * 
   * @param prisma 
   * @param jwt 
   * @param config 
   */
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * Generate JWT token
   * 
   * @param sub - user id
   * @param role - user role
   * @returns - access token
   */
  async generateToken(sub: number, role: Role) {
    const secret = this.config.get('JWT_SECRET');
    const payload = { sub, role };
    const options = { expiresIn: '1y', secret: secret };
    const token = await this.jwt.signAsync(payload, options);
    return { success: true, id: sub, access_token: token };
  }

  /**
   * Voter login
   * 
   * @param dto VoterAuthDto - cred_1 and cred_2
   * @returns access token
   */
  async voterLogin(dto: VoterAuthDto) {
    const { cred_1, cred_2 } = dto;

    // find voter by cred_1
    const voter = await this.prisma.voter.findUnique({
      where: { credential_1: cred_1 },
    });
    if (!voter) throw new ForbiddenException('Invalid credentials');

    // validate credential 2
    const isMatchCred2 = await argon.verify(voter.credential_2, cred_2);
    if (!isMatchCred2) throw new ForbiddenException('Invalid credentials');

    // return token
    return await this.generateToken(voter.id, Role.Voter);
  }

  /**
   * Society contact login
   * 
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
    return await this.generateToken(societyContact.id, Role.SocietyContact);
  }

  /**
   * Employee login
   * 
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
    const isMatchPwd = await argon.verify(employee.password, password);
    if (!isMatchPwd) throw new ForbiddenException('Invalid credentials');

    // return token
    return await this.generateToken(employee.id, Role.Employee);
  }
}
