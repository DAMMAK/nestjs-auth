/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';
import { GenerateTokenService } from '../generate-token.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: GenerateTokenService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map((user) => {
        // const response = context.switchToHttp().getResponse<Response>();
        // const  =  this.tokenService.signToken(user.id, user.status);

        // response.setHeader('Authorization', `Bearer ${token}`);
        // response.cookie('token', token, {
        //   httpOnly: true,
        //   signed: true,
        //   sameSite: 'strict',
        //   secure: process.env.NODE_ENV === 'production',
        // });

        // return { ...user, accessToken: token };
        return { ...user };
      }),
    );
  }
}
