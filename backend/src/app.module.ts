import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VotersModule } from './voter/voter.module';
import { SocietyModule } from './society/society.module';
import { EmployeeModule } from './employee/employee.module';
import { SocietyContactModule } from './society-contact/society-contact.module';
import { BallotModule } from './ballot/ballot.module';
import { OfficeModule } from './office/office.module';
import { CandidateModule } from './candidate/candidate.module';
import { VoteModule } from './vote/vote.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    VotersModule,
    SocietyModule,
    EmployeeModule,
    SocietyContactModule,
    BallotModule,
    OfficeModule,
    CandidateModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
