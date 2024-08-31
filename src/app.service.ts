import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a friendly "Hello World!" message.
   * @returns {string} A friendly greeting.
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Returns a health check object with the following properties:
   *  - `status`: A string indicating the health of the service. Should be "ok".
   *  - `uptime`: The number of seconds the service has been up.
   *  - `timestamp`: The current time in milliseconds.
   * @returns {Object} A health check object.
   */
  getHealthCheck(): { status: string; uptime: number; timestamp: number } {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
