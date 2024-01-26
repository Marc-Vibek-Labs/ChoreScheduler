import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppService } from './app.service'
import { PinoModule } from './pino/pino.module'
import { AuthModule } from './auth/auth.module'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import configuration from './config/configuration'
import { DatabaseModule } from './database/database.module'
import { ExperianModule } from './experian/experian.module'
import { ConfigModule } from '@nestjs/config'
import { ResetPasswordTokensModule } from './reset-password-tokens/reset-password-tokens.module'
import { UserVerificationTokensModule } from './user-verification-tokens/user-verification-tokens.module'
import { TrustgateModule } from './trustgate/trustgate.module'
import { LoansModule } from './loans/loans.module'
import { ArkmindModule } from './arkmind/arkmind.module'
import { TurnkeyModule } from './turnkey/turnkey.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { BusinessesModule } from './businesses/businesses.module'
import { CurlecModule } from './curlec/curlec.module'
import { PaymentMethodsModule } from './payment-methods/payment-methods.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TrustgateModule,
    AuthModule,
    PinoModule,
    UsersModule,
    DatabaseModule,
    UserVerificationTokensModule,
    LoansModule,
    ExperianModule,
    ResetPasswordTokensModule,
    UserVerificationTokensModule,
    ArkmindModule,
    TurnkeyModule,
    BusinessesModule,
    CurlecModule,
    PaymentMethodsModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule implements NestModule {
  configure(consumer: Readonly<MiddlewareConsumer>): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
