import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetPostCodeCommand } from '../../api/cities/cities.command';
import { CitiesCommandResponse } from './cities.interfaces';

@CommandHandler(GetPostCodeCommand)
export class GetPostCodeHandler implements ICommandHandler<GetPostCodeCommand> {
  async execute(command: GetPostCodeCommand): Promise<CitiesCommandResponse> {
    const { postCode } = command;
    const result = await fetch(`http://api.zippopotam.us/us/${postCode}`);
    const data = await result.json();

    return {
      postCode: data['post code'],
      country: data.country,
      places: data.places.map((it) => ({
        placeName: it['place name'],
        state: it.state,
        abbreviation: it['state abbreviation'],
      })),
    };
  }
}
