import { User } from '../users/user.model';
import { ErrorCode } from 'src/common/constants';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from 'src/users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

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
