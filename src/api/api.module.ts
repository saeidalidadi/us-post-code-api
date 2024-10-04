import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { CitiesController } from './cities/cities.controller';

@Module({
  controllers: [UsersController, CitiesController]
})
export class ApiModule {}
