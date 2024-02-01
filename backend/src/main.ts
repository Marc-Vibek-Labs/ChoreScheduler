import * as dayjs from 'dayjs';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { PinoService } from './pino/pino.service';
import * as dayjsDuration from 'dayjs/plugin/duration';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

dayjs.extend(dayjsDuration);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new PinoService(),
  });
  const configService = app.get(ConfigService);

  // const cookieTtlDuration = dayjs.duration(
  //   configService.get('ADMIN_COOKIE_TTL') || 3,
  //   'days',
  // );

  app.use(compression());

  // app.use(
  //   session({
  //     secret: process.env.BACKEND_SESSION_SECRET_KEY || '',
  //     cookie: {
  //       maxAge: cookieTtlDuration.asMilliseconds(),
  //       httpOnly: true
  //     },
  //     resave: false,
  //     saveUninitialized: false,
  //     name: configService.get('ADMIN_COOKIE_NAME') || 'il.sid',
  //     store: new KnexSessionStore({
  //       ttl: cookieTtlDuration.asSeconds()
  //     }).connect(UserSession)x
  //   })
  // );

  // app.use(passport.initialize());

  // app.use(passport.session());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: [configService.get('FRONTEND_URL') || 'http://localhost:3000'],
    credentials: true,
  });

  // Enable for ngrok like localhost server with domain name settings for redirection to localhost from 3rd party iframe
  // app.enableCors({
  //   origin: 'http://www.ilending.test',
  //   credentials: true,
  //   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  // });

  const port: number = configService.get('BACKEND_PORT') || 4000;

  await app.listen(port);
}
bootstrap();
