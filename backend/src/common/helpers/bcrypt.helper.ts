import * as bcrypt from 'bcryptjs';

const SALT_ROUND = 12;

export class Bcrypt {
  static async createHash(password: string): Promise<string> {
    const saltRound = bcrypt.genSaltSync(SALT_ROUND);

    return bcrypt.hash(password, saltRound);
  }

  static async comparePasswords(
    passwordClaim: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(passwordClaim, passwordHash);
  }
}
