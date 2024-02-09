import { User } from '../users/user.model';
import { ErrorCode } from 'src/common/constants';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from 'src/users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// The JwtStrategy is responsible for getting our token from the header of the request checks if the user exists in
// the database based on the user's ID, and either returns the authenticated user or throws an unauthorized exception
// if the user is not found. This strategy is used to secure routes that require authenticated access using JWT tokens
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      maxAge: parseInt(process.env.JWT_EXPIRES),
    });
  }

  async validate(payload: Partial<User>) {
    const { id } = payload;

    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new UnauthorizedException(ErrorCode.INCORRECT_USERNAME_OR_PASSWORD);
    }

    return user;
  }
}
