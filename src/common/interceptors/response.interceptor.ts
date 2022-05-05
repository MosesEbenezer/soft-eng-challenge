import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status_code: number;
  success: boolean;
  response_code: string;
  response_description: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        status_code: context.switchToHttp().getResponse().statusCode,
        success: true,
        response_code: '00',
        response_description: 'Success',
        data: data.data,
      })),
    );
  }
}
