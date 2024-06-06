import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: data.status || context.switchToHttp().getResponse().statusCode,
          message: data.message ? data.message : 'Sucessful request',
          data: data.result,
        };
      }),
    );
  }
}
