import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as Pino from 'pino';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from 'src/common/constants';

const logger = Pino.pino({
  name: 'UsersService',
});

@Injectable()
export class LoginJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Access request headers
    const headers = request.headers;
    const authorizationHeader = headers['authorization'];

    logger.info({
      msg: 'Request headers',
      authorizationHeader,
    });

    return super.canActivate(context);
  }

  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw new UnauthorizedException(ErrorCode.UNKNOWN_VALIDATION_ERROR);
    }
    return user;
  }
}
