import * as Pino from 'pino';
import {
  Injectable,
  HttpException,
  ServiceUnavailableException,
  UnprocessableEntityException,
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
}
