import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from '../../api/users/users.queries';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../persistence/entities';
import { Repository } from 'typeorm';
import { EncryptDecrypt } from '../encryptions.service';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly encryptions: EncryptDecrypt,
  ) {}

  async execute(query: GetMeQuery): Promise<any> {
    const { id } = query;
    const userRow = await this.userRepository.findOne({ where: { id } });
    const password = this.encryptions.decryptData(userRow.password);

    return { data: `${userRow.username}/${password}/${id}` };
  }
}
