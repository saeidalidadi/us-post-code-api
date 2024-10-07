import { Module } from '@nestjs/common';
import { SignupCommandHandler } from './users/command.handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../persistence/entities';
import { EncryptDecrypt } from './encryptions.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: { expiresIn: '30h' },
    }),
  ],
  providers: [SignupCommandHandler, EncryptDecrypt, JwtStrategy],
  exports: [EncryptDecrypt],
})
export class InfrastructureModule {}
