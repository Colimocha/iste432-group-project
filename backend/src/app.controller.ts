import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * A "test" function, to check if the server is up and running or not
   *
   * @returns
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
