import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { useCors } from '../middlewares/cors-setup';
import { ISwaggerOptions } from '@common/@types';
import { useSecurityMiddleware } from '@common/middlewares';
import { useSwagger } from './swagger';

/**
 * Bootstraps the Nest application.
 *
 * This function configures the application instance with the following:
 *
 * - URI versioning
 * - Helmet for security
 * - CORS with origins set to the value of the `ORIGIN` environment variable
 * - Validation pipe with implicit conversion enabled
 * - Swagger documentation and security middleware
 * - Listens on the port specified by the `PORT` environment variable
 *
 * @returns A Promise that resolves when the application has finished bootstrapping
 */
export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());

  useCors(app, configService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerOptions: ISwaggerOptions = {
    title: configService.get<string>('SWAGGER_TITLE', 'Notes API'),
    description: configService.get<string>(
      'SWAGGER_DESCRIPTION',
      'API documentation for the Notes service',
    ),
    version: configService.get<string>('SWAGGER_VERSION', '1.0'),
    serviceName: 'NotesService',
    swaggerUser: configService.get<string>('SWAGGER_USER', 'admin'),
    swaggerPassword: configService.get<string>('SWAGGER_PASSWORD', 'password'),
  };

  useSecurityMiddleware(app, swaggerOptions);
  useSwagger(app, swaggerOptions);

  const port: number = configService.get<number>('PORT', 3000);
  await app.listen(port, () => {
    const server = app.getHttpServer();
    const address = server.address();
    const host: string =
      typeof address === 'string' ? address : address.address;

    Logger.log(`🚀 Notes API is running on: http://${host}:${port}`);
    Logger.log(`📚 Swagger docs available at: http://${host}:${port}/docs`);
  });
}
