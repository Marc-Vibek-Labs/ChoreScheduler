import Objection from 'objection';
import { User } from './user.model';
import { Inject, Injectable } from '@nestjs/common';
import { BaseStatus, UserStatus } from 'src/common/constants';

@Injectable()
export class UsersRepository {
  constructor(@Inject(User) private readonly userRepository: typeof User) {}

  async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.query().findById(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.query().where('username', username).first();
  }

  async getUsersByUsername(usernames: string[]): Promise<User[] | undefined> {
    return this.userRepository.query().whereIn('username', usernames);
  }

  async createUser(
    user: Partial<User>,
    trx?: Objection.Transaction,
  ): Promise<User> {
    return this.userRepository.query(trx).insertAndFetch(user);
  }

  async updatePassword(
    username: string,
    passwordHash: string,
    trx?: Objection.Transaction,
  ): Promise<number> {
    return this.userRepository
      .query(trx)
      .patch({ passwordHash })
      .where('username', '=', username);
  }

  async updateUserStatusById(
    id: string,
    status: BaseStatus | UserStatus,
    trx?: Objection.Transaction,
  ): Promise<User> {
    return this.userRepository.query(trx).patchAndFetchById(id, { status });
  }
}
