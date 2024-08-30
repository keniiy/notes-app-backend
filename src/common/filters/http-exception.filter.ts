import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Catch any exceptions thrown by actions in any controller and format them
   * into a consistent error response.
   *
   * @param exception The exception to catch.
   * @param host The execution context of the exception.
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    const error: { [key: string]: any } =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${JSON.stringify(error)}`,
    );

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
