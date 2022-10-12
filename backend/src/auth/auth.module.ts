import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  VoterJwtStrategy,
  SocietyContactJwtStrategy,
  EmployeeJwtStrategy,
} from './strategy';

@Module({
  // import the JwtModule and register the jwtStrategy.
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    VoterJwtStrategy,
    SocietyContactJwtStrategy,
    EmployeeJwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
