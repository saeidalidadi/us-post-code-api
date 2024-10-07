import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetPostCodeCommand } from '../../api/cities/cities.command';
import { InjectRepository } from '@nestjs/typeorm';
import { City, User } from '../../persistence/entities';
import { Repository } from 'typeorm';

@CommandHandler(GetPostCodeCommand)
export class GetPostCodeHandler implements ICommandHandler<GetPostCodeCommand> {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
  ) {}

  async execute(command: GetPostCodeCommand): Promise<City> {
    const { postCode, userId } = command;
    const result = await fetch(`http://api.zippopotam.us/us/${postCode}`);
    const data = await result.json();

    const postCodeRow = this.cityRepository.create();
    postCodeRow.postCode = data['post code'];
    postCodeRow.country = data.country;
    postCodeRow.places = data.places.map((it) => ({
      placeName: it['place name'],
      state: it.state,
      abbreviation: it['state abbreviation'],
    }));
    postCodeRow.user = { id: userId } as User;

    const row = await this.cityRepository.save(postCodeRow);

    return row;
  }
}
