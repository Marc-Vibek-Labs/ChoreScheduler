import * as Joi from 'joi';

export interface IErrorResponse {
  errorCode: string;
  message: string;
  context?: {
    type: string;
  } & Joi.Context;
}
