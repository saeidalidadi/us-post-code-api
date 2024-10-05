import { Module } from '@nestjs/common';
import { SignupCommandHandler } from './users/command.handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../persistence/entities';
import { EncryptDecrypt } from './encryptions.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SignupCommandHandler, EncryptDecrypt],
  exports: [EncryptDecrypt],
})
export class InfrastructureModule {}
