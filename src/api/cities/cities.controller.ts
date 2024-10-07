import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetPostCodeCommand } from './cities.command';
import { JwtAuthGuard } from '../../infrastructure/jwt-auth.guard';
import { AuthenticatedRequest } from '../../infrastructure/auth.types';

@Controller('cities')
export class CitiesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':postCode')
  @UseGuards(JwtAuthGuard)
  getPostCode(
    @Param('postCode') postCode: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.commandBus.execute(
      new GetPostCodeCommand(postCode, req.user.id),
    );
  }

  @Get('my-requests')
  getMyRequests() {
    return 'My requests';
  }
}
