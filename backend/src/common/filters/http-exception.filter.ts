import { Response } from 'express'
import { IErrorResponse } from '../error/error.dto'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { ErrorCode, errorMessages } from '../error/constants'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'

// Properties from exception.getResponse()
interface IHttpError {
  statusCode: HttpStatus
  message: string
  error: unknown
}

// Reference: https://docs.nestjs.com/exception-filters
@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp()
    const response: Response = ctx.getResponse<Response>()
    const status: HttpStatus = exception.getStatus()

    // Could either be IHttpErrorResponse or ErrorResponse
    const error = exception.getResponse() as IHttpError | IErrorResponse

    let errorResponse: IErrorResponse

    let errorMessage: string
    if ('error' in error && typeof error.error === 'string') {
      errorMessage = error.error
    }

    if ('errorCode' in error && error.errorCode === ErrorCode.BAD_REQUEST) {
      errorResponse = error
    } else if ((Object.values(ErrorCode) as string[]).includes(error.message)) {
      const errorCode = error.message as ErrorCode
      errorResponse = {
        errorCode: errorCode,
        message: errorMessage || errorMessages[errorCode]
      }
      // Test if the message is in the error code format
    } else if (new RegExp(/^\w*(-\w+)+$/).test(error.message)) {
      errorResponse = {
        errorCode: error.message,
        message: errorMessage || errorMessages[ErrorCode.UNKNOWN_ERROR]
      }
    } else {
      errorResponse = {
        errorCode: ErrorCode.UNKNOWN_ERROR,
        message: errorMessage || errorMessages[ErrorCode.UNKNOWN_ERROR]
      }
    }

    response.status(status).json(errorResponse)
  }
}
