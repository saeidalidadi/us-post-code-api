import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('/sign-up')
  register() {
    return 'success';
  }

  @Get('/me')
  me() {
    return 'me';
  }
}
