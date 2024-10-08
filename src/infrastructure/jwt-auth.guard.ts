import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IS_OPTIONAL_KEY } from './jwt-optional.decorator';
import { Reflector } from '@nestjs/core';
import { User } from './auth.types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<T = User>(
    err: Error,
    user: any,
    info: any,
    context: ExecutionContext,
  ): T {
    // You can throw an exception based on either "info" or "err" arguments
    const isOptional = this.reflector.getAllAndOverride<boolean>(
      IS_OPTIONAL_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (err || !user) {
      if (isOptional) return user;
      throw err || new UnauthorizedException();
    }
    return user as T;
  }
}
