import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignupCommand } from './users.command';
import { UserSignupDto } from './dtos/signup.dto';
import { JwtAuthGuard } from '../../infrastructure/jwt-auth.guard';
import { AuthenticatedRequest } from '../../infrastructure/auth.types';

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
  @UseGuards(JwtAuthGuard)
  me(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
