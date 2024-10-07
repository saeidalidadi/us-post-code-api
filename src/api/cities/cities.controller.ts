import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetPostCodeCommand } from './cities.command';

@Controller('cities')
export class CitiesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':postCode')
  getPostCode(@Param('postCode') postCode: number) {
    return this.commandBus.execute(new GetPostCodeCommand(postCode));
  }

  @Get('my-requests')
  getMyRequests() {
    return 'My requests';
  }
}
