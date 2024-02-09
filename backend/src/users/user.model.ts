import BaseModel from '../common/base.model';
import { Bcrypt } from '../common/helpers/bcrypt.helper';
import { BaseStatus, UserStatus } from '../common/constants';

export class User extends BaseModel {
  static tableName = 'cs_users';

  status: BaseStatus | UserStatus;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  passwordHash: string;

  async isCorrectPassword(password: string): Promise<boolean> {
    return Bcrypt.comparePasswords(password, this.passwordHash);
  }

  isStatusUnverified(): boolean {
    return this.status === UserStatus.UNVERIFIED;
  }
}
