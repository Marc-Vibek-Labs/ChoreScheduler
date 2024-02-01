import * as pino from 'pino';
import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class PinoService implements LoggerService {
  private readonly logger: pino.Logger;
  constructor() {
    const formatters = {
      level(levelLabel: string) {
        return { level: levelLabel };
      },
    };
    this.logger = pino.pino({
      level: process.env.PINO_LOG_LEVEL || 'info',
      formatters,
    });

    // We cannot use ConfigService to get the env var LOG_LEVEL as PinoService is used as part of the initialization
    // process for NestJS (see src/main.ts). Otherwise, we would create a circular dependency in the form of
    // PinoService → ConfigService → Nest (init) → PinoService
    this.logger.level = process.env.LOG_LEVEL || 'info';
  }

  debug(msg: string, ...args: any[]): void {
    this.logger.debug(msg, ...args);
  }

  info(msg: string, ...args: any[]): void {
    this.logger.info(msg, ...args);
  }

  log(msg: string, ...args: any[]): void {
    this.logger.info(msg, ...args);
  }

  warn(msg: string, ...args: any[]): void {
    this.logger.warn(msg, ...args);
  }

  error(msg: string, ...args: any[]): void {
    this.logger.error(msg, ...args);
  }

  fatal(msg: string, ...args: any[]): void {
    this.logger.fatal(msg, ...args);
  }
}
