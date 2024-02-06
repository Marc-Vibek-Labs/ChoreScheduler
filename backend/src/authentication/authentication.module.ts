import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/users/user.model';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    HttpModule,
    ObjectionModule.forFeature([User]),
  ],
  controllers: [AuthenticationController],
  providers: [
    JwtStrategy,
    UsersService,
    UsersRepository,
    AuthenticationService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticationModule {}
