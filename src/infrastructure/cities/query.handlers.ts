import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MyRequestsQuery } from '../../api/cities/cities.query';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../../persistence/entities';
import { Repository } from 'typeorm';

@QueryHandler(MyRequestsQuery)
export class MyRequestQueryHandler implements IQueryHandler<MyRequestsQuery> {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
  ) {}

  async execute(
    query: MyRequestsQuery,
  ): Promise<{ data: City[]; total: number }> {
    const { userId, page = 1 } = query;
    const perPage = 2;
    const skip = (page - 1) * perPage;

    const rows = await this.cityRepository.findAndCount({
      where: { user: { id: userId } },
      skip,
      take: perPage,
    });

    return { data: rows[0], total: rows[1] };
  }
}
