import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeAuthDto, SCAuthDto, VoterAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('voter')
  async voterLogin(@Body() body: VoterAuthDto) {
    return this.authService.voterLogin(body);
  }

  @Post('societycontact')
  async societyContactLogin(@Body() body: SCAuthDto) {
    return this.authService.societyContactLogin(body);
  }

  @Post('employee')
  async employeeLogin(@Body() body: EmployeeAuthDto) {
    return this.authService.employeeLogin(body);
  }
}
