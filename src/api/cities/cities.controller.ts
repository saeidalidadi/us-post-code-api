import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPostCodeCommand } from './cities.command';
import { JwtAuthGuard } from '../../infrastructure/jwt-auth.guard';
import { AuthenticatedRequest } from '../../infrastructure/auth.types';
import { MyRequestsQuery } from './cities.query';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('my-requests')
  @UseGuards(JwtAuthGuard)
  getMyRequests(
    @Query('page') page: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.queryBus.execute(new MyRequestsQuery(req.user.id, page));
  }

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
}
