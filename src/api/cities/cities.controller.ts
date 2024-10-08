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
import { MyRequestsQueryDto } from './dtos/my-requests.dto';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('my-requests')
  @UseGuards(JwtAuthGuard)
  getMyRequests(
    @Query() query: MyRequestsQueryDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.queryBus.execute(new MyRequestsQuery(req.user.id, query.page));
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
