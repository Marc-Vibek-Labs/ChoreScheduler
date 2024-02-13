import { Request } from 'express';
import { User } from './user.model';
import {
  IUpdatePassword,
  createUserSchema,
  updatePasswordSchema,
} from './user.dto';
import {
  Req,
  Put,
  Get,
  Body,
  Post,
  Param,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginJwtAuthGuard } from 'src/guards/auth.guard';
import { ValidatorPipe } from '../common/pipes/validator.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/user')
  @UseGuards(LoginJwtAuthGuard)
  async getLoggedInUserDetails(@Req() request: Request): Promise<User> {
    return request.user as User;
  }

  @Get('/user/:id')
  @UseGuards(LoginJwtAuthGuard)
  async getUserById(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<User> {
    return this.usersService.getUserByIdOrEmail(id, request.user as User);
  }

  @Post('/create-user')
  @UseGuards(LoginJwtAuthGuard)
  async createUser(
    @Body(new ValidatorPipe(createUserSchema))
    body: Pick<User, 'firstName' | 'lastName' | 'email' | 'phoneNumber'> & {
      password: string;
    },
    @Req() request: Request,
  ): Promise<unknown> {
    return this.usersService.createUser(body, request.user as User);
  }

  @Put('/update-password')
  @UseGuards(LoginJwtAuthGuard)
  async updatePassword(
    @Body(new ValidatorPipe(updatePasswordSchema)) body: IUpdatePassword,
    @Req() request: Request,
  ): Promise<unknown> {
    return this.usersService.updatePassword(body, request.user as User);
  }
}
