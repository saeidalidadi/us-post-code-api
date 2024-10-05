import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from '../../api/users/users.command';

@CommandHandler(SignupCommand)
export class SignupCommandHandler implements ICommandHandler<SignupCommand> {
  constructor() {}
  async execute(command: SignupCommand): Promise<any> {
    const { username, password } = command;
    return 'Hello Signup Command';
  }
}
