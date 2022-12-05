import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmployeeAuthDto, SCAuthDto, VoterAuthDto } from './dto';

/**
 * the controller for the login
 *
 * @class AuthController
 */
@Controller('auth')
export class AuthController {
  /**
   * Construct the authentication service controller
   *
   * @param authService
   * @constructor
   */
  constructor(private authService: AuthService) {}

  /**
   * Function that handle the login for voter
   *
   * @param body - the data from frontend
   * @returns
   */
  @Post('voter')
  @HttpCode(HttpStatus.OK)
  async voterLogin(@Body() body: VoterAuthDto) {
    return this.authService.voterLogin(body);
  }

  /**
   * Function that handle the login for society contact
   *
   * @param body - the data from frontend
   * @returns
   */
  @Post('societycontact')
  @HttpCode(HttpStatus.OK)
  async societyContactLogin(@Body() body: SCAuthDto) {
    return this.authService.societyContactLogin(body);
  }

  /**
   * Function that handle the login for employee
   *
   * @param body - the data from frontend
   * @returns
   */
  @Post('employee')
  @HttpCode(HttpStatus.OK)
  async employeeLogin(@Body() body: EmployeeAuthDto) {
    return this.authService.employeeLogin(body);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() body: EmployeeAuthDto) {
    return this.authService.register(body);
  }
}
