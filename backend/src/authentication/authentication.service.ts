import * as Pino from 'pino';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { ErrorCode } from 'src/common/constants';
import { UsersService } from '../users/users.service';
import { ISignUp, ILogin } from './authentication.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

const logger = Pino.pino({
  name: 'UsersService',
});

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async signUp(signUpDto: ISignUp): Promise<{ token: string }> {
    const newUser: Partial<User> =
      await this.usersService.createUser(signUpDto);

    const token = this.jwtService.sign({ id: newUser.id });

    return { token };
  }

  async login(loginDto: ILogin): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const loggedInUser: Partial<User> =
      await this.usersService.getUserByIdOrEmail(email);

    if (!loggedInUser) {
      throw new UnauthorizedException(ErrorCode.USER_NOT_FOUND);
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      loggedInUser.passwordHash,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException(ErrorCode.INCORRECT_PASSWORD);
    }

    const token = this.jwtService.sign({ id: loggedInUser.id });

    return { token, ...loggedInUser };
  }
}
