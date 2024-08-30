import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Configures CORS for the Nest application based on the environment.
 *
 * In production, sets the origin to the value of the `PRODUCTION_ORIGIN`
 * environment variable, or `*` if no value is set. Allows the standard
 * `GET`, `POST`, `PUT`, and `DELETE` methods, and permits the `Content-Type`
 * and `Authorization` headers.
 *
 * In development, enables CORS for all origins.
 *
 * @param app The Nest application instance to configure.
 * @param configService The configuration service to use for reading environment
 * variables.
 */
export function useCors(
  app: INestApplication,
  configService: ConfigService,
): void {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  if (isProduction) {
    app.enableCors({
      origin: configService.get<string>('PRODUCTION_ORIGIN', '*'),
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    app.enableCors();
  }
}
