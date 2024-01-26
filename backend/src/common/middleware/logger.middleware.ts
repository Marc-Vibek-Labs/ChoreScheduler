import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as Pino from 'pino'
import { objectMap } from '../helpers/object.helper'
import { Primitive, RecursiveObject } from '../helpers/type.helper'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = Pino.pino({
    name: 'LoggerMiddleware'
  })
  use(req: Request, res: Response, next: NextFunction): void {
    // Close event is when the call has completed
    res.on('close', () => {
      const loggerType: 'info' | 'error' = ['4', '5'].includes(
        res.statusCode.toString()[0]
      )
        ? 'error'
        : 'info'

      // Function to hide password in the object
      const hidePassword = (
        key: string,
        value: Primitive | RecursiveObject
      ): Primitive | RecursiveObject => {
        if (
          key.toLowerCase().includes('password') &&
          (value instanceof String || typeof value === 'string')
        ) {
          return 'xxxxxxxx'
        }
        return value
      }

      // Hide passwords if they were included in the request
      // It might end up censoring unrelated data with 'password', but might not be too relevant
      // Response doesn't matter as that is what the client will see anyway, but request objects are provided by clients
      const censoredBody = objectMap(req.body, hidePassword)
      const censoredParams = objectMap(req.params, hidePassword)

      this.logger[loggerType](
        {
          ip: req.ip,
          user: req.user,
          statusCode: res.statusCode,
          body: censoredBody,
          params: censoredParams,
          headers: req.headers
        },
        `Called ${req.method} ${req.url} with status code ${res.statusCode}`
      )
    })
    next()
  }
}
