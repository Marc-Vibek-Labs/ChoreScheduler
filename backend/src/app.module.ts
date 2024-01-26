import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { PinoModule } from './pino/pino.module'
import { AppController } from './app.controller'
import configuration from './config/configuration'
import { DatabaseModule } from './database/database.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './common/middleware/logger.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    PinoModule,
    DatabaseModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: Readonly<MiddlewareConsumer>): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
