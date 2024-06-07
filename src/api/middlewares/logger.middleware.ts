import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      
      const { method, originalUrl, ip } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${ip}`;

      if (statusCode >= 500) return this.logger.error(message);

      if (statusCode >= 400) return this.logger.warn(message);

      this.logger.log(message);
    });

    next();
  }
}

export default LoggerMiddleware;
