import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { CitiesController } from './cities/cities.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [UsersController, CitiesController],
})
export class ApiModule {}
