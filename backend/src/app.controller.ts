import { AppService } from './app.service'
import { ConfigService } from '@nestjs/config'
import { Controller, Get } from '@nestjs/common'
import { PinoService } from './pino/pino.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly logger: PinoService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/health-check')
  checkHealth(): boolean {
    return true
  }
}
