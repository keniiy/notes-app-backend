import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ISwaggerOptions } from '@common/@types';

/**
 * Configure swagger documentation for the application.
 *
 * @param app The Nest application instance to configure.
 * @param options The options to use when configuring swagger.
 */
export function useSwagger(
  app: INestApplication,
  options: ISwaggerOptions,
): void {
  const config = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(options.basePath || '/docs', app, document);
}
