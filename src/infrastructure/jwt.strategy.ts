import * as jwt from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(jwt.Strategy) {
  constructor() {
    super({
      jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  validate(payload: User) {
    return { id: payload.id, username: payload.username };
  }
}
