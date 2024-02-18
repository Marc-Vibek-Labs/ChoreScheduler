import * as Pino from 'pino';
import * as bcrypt from 'bcryptjs';
import { Transaction } from 'objection';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import * as PasswordGenerator from 'generate-password';
import { ISignUp, ILogin } from './authentication.dto';
import { Bcrypt } from 'src/common/helpers/bcrypt.helper';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { BaseStatus, ErrorCode, errorMessages } from 'src/common/constants';

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

    const token = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
    });

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

    const token = this.jwtService.sign({
      id: loggedInUser.id,
      email: loggedInUser.email,
    });

    return { token, ...loggedInUser };
  }

  async validateThirdPartyUser(
    email: string,
    jsonData?: Record<any, any>,
  ): Promise<string> {
    const trx: Transaction = await User.startTransaction();
    try {
      let token: string;
      const existingUser: User | undefined =
        await this.usersRepository.getUserByEmail(email);

      if (existingUser) {
        token = this.jwtService.sign({
          id: existingUser.id,
          email: existingUser.email,
        });
        return token;
      }

      const user: Partial<User> = {
        email,
        status: BaseStatus.ACTIVE,
        passwordHash: await Bcrypt.createHash(
          PasswordGenerator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
          }),
        ),
        firstName: jsonData['given_name'],
        lastName: jsonData['family_name'],
      };

      const newUser = await this.usersRepository.createUser(user, trx);

      token = this.jwtService.sign({ id: newUser.id, email: newUser.email });

      await trx.commit();
      return token;
    } catch (ex: unknown) {
      await trx.rollback();

      if (ex instanceof HttpException) {
        throw ex;
      }

      const error = ex as Error;
      logger.error({
        msg: `Failed to register new user: ${error.message}`,
        email,
        stack: error.stack,
      });

      throw new ServiceUnavailableException(
        ErrorCode.USER_REGISTRATION_FAILED,
        errorMessages[ErrorCode.USER_REGISTRATION_FAILED],
      );
    }
  }
}
