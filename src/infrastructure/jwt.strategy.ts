import * as jwt from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(jwt.Strategy) {
  constructor() {
    console.log('constructor');
    super({
      jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  validate(payload: User) {
    console.log('user payload', payload);
    return { id: payload.id, username: payload.username };
  }
}
