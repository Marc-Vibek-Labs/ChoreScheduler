import * as Pino from 'pino';
import {
  Injectable,
  HttpException,
  ServiceUnavailableException,
  UnprocessableEntityException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { IUpdatePassword } from './user.dto';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from './users.repository';
import { Bcrypt } from '../common/helpers/bcrypt.helper';
import { ErrorCode, errorMessages } from '../common/constants';

const logger = Pino.pino({
  name: 'UsersService',
});

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async updatePassword(
    { oldPassword, newPassword, confirmPassword }: IUpdatePassword,
    user: User,
  ): Promise<unknown> {
    const trx = await User.startTransaction();

    try {
      const userEntity: User | undefined =
        await this.usersRepository.getUserByUsername(user.username);

      if (!(await userEntity.isCorrectPassword(oldPassword))) {
        throw new UnprocessableEntityException(
          ErrorCode.INCORRECT_PASSWORD,
          errorMessages[ErrorCode.INCORRECT_PASSWORD],
        );
      }

      if (newPassword !== confirmPassword) {
        throw new UnprocessableEntityException(
          ErrorCode.PASSWORD_MATCH_FAIL,
          errorMessages[ErrorCode.PASSWORD_MATCH_FAIL],
        );
      }

      const passwordHash = await Bcrypt.createHash(newPassword);
      const updatePasswordResponse = await this.usersRepository.updatePassword(
        user.username,
        passwordHash,
        trx,
      );

      logger.info({
        msg: 'Updated password',
        updatePasswordResponse,
      });

      await trx.commit();
      return null;
    } catch (ex: unknown) {
      await trx.rollback();
      if (ex instanceof HttpException) {
        throw ex;
      }

      const error = ex as Error;

      logger.error(
        {
          userId: user.id,
          stack: error.stack,
        },
        `Failed to patch user profile`,
      );

      throw new ServiceUnavailableException(
        ErrorCode.USER_PROFILE_UPDATE_FAILED,
      );
    }
  }

  async createUser(
    {
      firstName,
      lastName,
      username,
      password,
    }: Pick<User, 'firstName' | 'lastName' | 'username'> & {
      password: string;
    },
    user?: User,
  ): Promise<unknown> {
    const trx = await User.startTransaction();

    try {
      // Check that the provided username is unique and not already in use by another account
      const existingUserWithSameUsername = await User.query(trx)
        .where('username', username)
        .first();
      if (existingUserWithSameUsername != null) {
        throw new ConflictException(ErrorCode.USERNAME_ALREADY_IN_USE);
      }

      // Hash the provided password before storing it in the database
      const passwordHash = await Bcrypt.createHash(password);
      const newUser: Partial<User> = {
        firstName,
        lastName,
        username,
        passwordHash,
      };
      const createdUser = await this.usersRepository.createUser(newUser, trx);

      logger.info({
        msg: 'User created',
        createdUser,
      });

      await trx.commit();
      return createdUser;
    } catch (ex: unknown) {
      await trx.rollback();
      if (ex instanceof HttpException) {
        throw ex;
      }

      const error = ex as Error;

      logger.error(
        {
          userId: user?.id ?? username,
          stack: error.stack,
          errorMessage: error.message,
        },
        `Failed to create user profile`,
      );

      throw new ServiceUnavailableException(ErrorCode.USER_REGISTRATION_FAILED);
    }
  }

  async getUserByIdOrUsername(
    idOrUsername: string,
    user?: User,
  ): Promise<User | null> {
    try {
      let foundUser: User | null;
      if (idOrUsername.includes('@')) {
        foundUser = await this.usersRepository.getUserByUsername(idOrUsername);
      } else {
        foundUser = await this.usersRepository.getUserById(idOrUsername);
      }

      logger.info({
        msg: 'Found user',
        foundUser,
      });

      if (!foundUser) {
        throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
      }

      return foundUser;
    } catch (ex: unknown) {
      if (ex instanceof HttpException) {
        throw ex;
      }

      const error = ex as Error;

      logger.error(
        {
          userId: user?.id ?? idOrUsername,
          stack: error.stack,
          errorMessage: error.message,
        },
        `Failed to find user profile`,
      );

      throw new ServiceUnavailableException(ErrorCode.USER_NOT_FOUND);
    }
  }
}
