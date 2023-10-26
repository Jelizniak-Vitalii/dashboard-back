import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

import { ApiResponse } from '../models';

@Injectable()
export class ResponseInterceptor implements NestInterceptor<ApiResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: '',
        data,
      })),
      catchError((error) => throwError(error)),
    );
  }
}
