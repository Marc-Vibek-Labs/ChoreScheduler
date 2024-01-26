import * as Joi from 'joi'
import { ErrorCode } from './constants'

export interface IErrorResponse {
  errorCode: string
  message: string
  context?: {
    type: string
  } & Joi.Context
}
