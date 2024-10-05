import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from '../../api/users/users.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../persistence/entities';
import { Repository } from 'typeorm';
import { EncryptDecrypt } from '../encryptions.service';

@CommandHandler(SignupCommand)
export class SignupCommandHandler implements ICommandHandler<SignupCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly encryptions: EncryptDecrypt,
  ) {}

  async execute(command: SignupCommand): Promise<any> {
    const { username, password } = command;
    const encryptedPassword = this.encryptions.encryptData(password);
    const userRow = this.userRepository.create();
    userRow.password = encryptedPassword;
    userRow.username = username;

    return this.userRepository.save(userRow);
  }
}
