import { Module } from '@nestjs/common';
import { SignupCommandHandler } from './users/command.handlers';

@Module({
  providers: [SignupCommandHandler],
})
export class InfrastructureModule {}
