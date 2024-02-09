import * as Joi from 'joi';
import { User } from './user.model';
import { BaseStatus, UserStatus } from 'src/common/constants';

export class UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  status: BaseStatus | UserStatus;

  constructor(params: User) {
    this.id = params.id;
    this.status = params.status;
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.phoneNumber = params.phoneNumber;
  }
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const createUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  phoneNumber: Joi.number().required(),
});
