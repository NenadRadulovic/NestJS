import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDTO } from '../dtos/create-user.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
  ) {}

  async createUser({
    email,
    password,
    first_name,
    last_name,
    role,
  }: CreateUserDTO): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    console.log(hashedPassword);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role,
    });
    this.userRepository.getEntityManager().persistAndFlush(user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = this.userRepository.getEntityManager().find(
      User,
      {},
      {
        populate: ['role'],
      },
    );
    return users;
  }

  async getUserByID(id: number): Promise<User | undefined> {
    const user = this.userRepository.getEntityManager().findOne(User, {
      _id: id,
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = this.userRepository.getEntityManager().findOne(User, {
      email,
    });
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOfRound = 10;
    const salt = await bcrypt.genSalt(saltOfRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
