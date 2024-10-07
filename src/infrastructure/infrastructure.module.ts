import { Module } from '@nestjs/common';
import { SignupCommandHandler } from './users/command.handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City, User } from '../persistence/entities';
import { EncryptDecrypt } from './encryptions.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GetMeHandler } from './users/query.handlers';
import { GetPostCodeHandler } from './cities/command.handlers';
import { MyRequestQueryHandler } from './cities/query.handlers';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, City]),
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: { expiresIn: '30h' },
    }),
  ],
  providers: [
    SignupCommandHandler,
    GetMeHandler,
    GetPostCodeHandler,
    MyRequestQueryHandler,
    EncryptDecrypt,
    JwtStrategy,
  ],
  exports: [EncryptDecrypt],
})
export class InfrastructureModule {}
