import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PinoModule } from './pino/pino.module';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PinoModule,
    UsersModule,
    DatabaseModule,
    AuthenticationModule,
  ],
  // All the @Injectable classes are providers. If you want to use any of the @Injectables in a module, they must be
  // included in the providers array of that module.
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: Readonly<MiddlewareConsumer>): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
