import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from '../../api/users/users.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../persistence/entities';
import { Repository } from 'typeorm';
import { EncryptDecrypt } from '../encryptions.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';

@CommandHandler(SignupCommand)
export class SignupCommandHandler implements ICommandHandler<SignupCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly encryptions: EncryptDecrypt,
    private jwtService: JwtService,
  ) {}

  async execute(command: SignupCommand): Promise<{ token: string }> {
    const { username, password } = command;
    try {
      const encryptedPassword = this.encryptions.encryptData(password);
      const userRow = this.userRepository.create();
      userRow.password = encryptedPassword;
      userRow.username = username;

      const result = await this.userRepository.save(userRow);

      const token = this.jwtService.sign({ username, id: result.id });
      return { token };
    } catch (err) {
      if (err.code == 23505) {
        throw new ConflictException({
          message: 'This username already exists!',
        });
      }
    }
  }
}
