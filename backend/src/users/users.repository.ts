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

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.query().where('email', email).first();
  }

  async getUsersByEmail(emails: string[]): Promise<User[] | undefined> {
    return this.userModel.query().whereIn('email', emails);
  }

  async createUser(
    user: Partial<User>,
    trx?: Objection.Transaction,
  ): Promise<User> {
    return this.userModel.query(trx).insertAndFetch(user);
  }

  async updatePassword(
    email: string,
    passwordHash: string,
    trx?: Objection.Transaction,
  ): Promise<number> {
    return this.userModel
      .query(trx)
      .patch({ passwordHash })
      .where('email', '=', email);
  }

  async updateUserStatusById(
    id: string,
    status: BaseStatus | UserStatus,
    trx?: Objection.Transaction,
  ): Promise<User> {
    return this.userModel.query(trx).patchAndFetchById(id, { status });
  }
}
