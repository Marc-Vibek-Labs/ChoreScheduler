import { Request } from 'express';
import { User } from './user.model';
import { UsersService } from './users.service';
// import { SessionGuard } from '../common/guards/session.guard';
import { ValidatorPipe } from '../common/pipes/validator.pipe';
import { IUpdatePassword, updatePasswordSchema } from './user.dto';
import { Req, Put, Get, Body, UseGuards, Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/update-password')
  async updatePassword(
    @Body(new ValidatorPipe(updatePasswordSchema)) body: IUpdatePassword,
    @Req() request: Request,
  ): Promise<unknown> {
    return this.usersService.updatePassword(body, request.user as User);
  }
}
