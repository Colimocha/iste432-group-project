import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * A global module that contains the service for Prisma which allow the access to the database
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
