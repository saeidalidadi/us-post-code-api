import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignupCommand } from './users.command';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/sign-up')
  register(@Body() data: any) {
    return this.commandBus.execute(
      new SignupCommand(data.username, data.password),
    );
    return 'success';
  }

  @Get('/me')
  me() {
    return 'me';
  }
}
