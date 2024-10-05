import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignupCommand } from './users.command';
import { UserSignupDto } from './dtos/signup.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/sign-up')
  register(@Body() data: UserSignupDto) {
    return this.commandBus.execute(
      new SignupCommand(data.username, data.password),
    );
  }

  @Get('/me')
  me() {
    return 'me';
  }
}
