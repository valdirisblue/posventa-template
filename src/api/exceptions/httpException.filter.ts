import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export interface IErrorResponse {
  statusCode: number;
  message: string;
  details?: any;
  timestamp: string;
  path: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (request) {
      const exceptionResponse: string | any = exception.getResponse();
      const exceptionStatus: number = exception.getStatus();

      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exception.message;

      const statusCode = exceptionStatus
        ? exceptionStatus
        : HttpStatus.INTERNAL_SERVER_ERROR;

      const errorResponse: IErrorResponse = {
        statusCode,
        message,
        details: exceptionResponse?.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      this.logger.error(exception, HttpExceptionFilter.name);
      return response.status(statusCode).json(errorResponse);
    }
  }
}
