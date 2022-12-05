import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * A class that connect the backend to the database
 * 
 * @class PrismaService
 */
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // Connect to the Prisma database.
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
