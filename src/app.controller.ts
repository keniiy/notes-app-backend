import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App-Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  /**
   * Returns a greeting message from the application service.
   *
   * @returns A greeting message.
   */
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  /**
   * Returns a health check object that contains the application's status, uptime
   * in milliseconds, and current timestamp.
   *
   * @returns A health check object.
   */
  getHealthCheck(): { status: string; uptime: number; timestamp: number } {
    return this.appService.getHealthCheck();
  }
}
