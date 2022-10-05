import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // Connect to the Prisma database.
    super({
      datasources: {
        db: {
          provider: 'mysql',
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
