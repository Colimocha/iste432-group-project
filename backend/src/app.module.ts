import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VotersModule } from './voters/voters.module';
import { SocietyModule } from './society/society.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    VotersModule,
    SocietyModule,
  ],
})
export class AppModule {}
