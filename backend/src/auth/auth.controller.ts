import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmployeeAuthDto, SCAuthDto, VoterAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('voter')
  @HttpCode(HttpStatus.OK)
  async voterLogin(@Body() body: VoterAuthDto) {
    return this.authService.voterLogin(body);
  }

  @Post('societycontact')
  @HttpCode(HttpStatus.OK)
  async societyContactLogin(@Body() body: SCAuthDto) {
    return this.authService.societyContactLogin(body);
  }

  @Post('employee')
  @HttpCode(HttpStatus.OK)
  async employeeLogin(@Body() body: EmployeeAuthDto) {
    return this.authService.employeeLogin(body);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body.username, body.password);
  }
}
