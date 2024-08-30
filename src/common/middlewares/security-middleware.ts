import { INestApplication } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ISwaggerOptions } from '../@types';
import * as basicAuth from 'basic-auth';

/**
 * Adds a middleware to the Nest application that enables basic authentication
 * for the swagger documentation.
 *
 * The middleware will check for a `Authorization` header with a basic auth
 * value. If the header is present and the username and password match the
 * values provided in the `options`, the request will be passed through to the
 * next middleware.
 *
 * If the header is missing or the username and password do not match, a 401
 * response will be sent with a `WWW-Authenticate` header set to
 * `Basic realm="Swagger Documentation"`.
 *
 * @param app The Nest application instance to configure.
 * @param options The options to use when configuring swagger.
 */
export function useSecurityMiddleware(
  app: INestApplication,
  options: ISwaggerOptions,
): void {
  app.use(
    [options.basePath || '/docs', `${options.basePath || '/docs'}-json`],
    (req: Request, res: Response, next: NextFunction) => {
      const credentials = basicAuth(req);

      if (
        credentials &&
        credentials.name === options.swaggerUser &&
        credentials.pass === options.swaggerPassword
      ) {
        return next();
      } else {
        res.setHeader(
          'WWW-Authenticate',
          'Basic realm="Swagger Documentation"',
        );
        res.status(401).end('Access denied');
      }
    },
  );
}
