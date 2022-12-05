import { Injectable } from '@nestjs/common';

/**
 * The "main method" of the backend
 *
 * @class AppService
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'The Restful API service is running.';
  }
}
