import Objection from 'objection';
import { User } from './user.model';
import { Inject, Injectable } from '@nestjs/common';
import { BaseStatus, UserStatus } from 'src/common/constants';

@Injectable()
export class UsersRepository {
  constructor(@Inject(User) private readonly userModel: typeof User) {}

  async getUserById(id: string): Promise<User | undefined> {
    return this.userModel.query().findById(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.userModel.query().where('username', username).first();
  }

  async getUsersByUsername(usernames: string[]): Promise<User[] | undefined> {
    return this.userModel.query().whereIn('username', usernames);
  }

  async createUser(
    user: Partial<User>,
    trx?: Objection.Transaction,
  ): Promise<User> {
    return this.userModel.query(trx).insertAndFetch(user);
  }

  async updatePassword(
    username: string,
    passwordHash: string,
    trx?: Objection.Transaction,
  ): Promise<number> {
    return this.userModel
      .query(trx)
      .patch({ passwordHash })
      .where('username', '=', username);
  }

  async updateUserStatusById(
    id: string,
    status: BaseStatus | UserStatus,
    trx?: Objection.Transaction,
  ): Promise<User> {
    return this.userModel.query(trx).patchAndFetchById(id, { status });
  }
}
