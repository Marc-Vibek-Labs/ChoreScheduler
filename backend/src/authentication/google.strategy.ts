import * as Pino from 'pino';
import { Profile } from 'passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { VerifyCallback } from 'passport-jwt';
import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';

const logger = Pino.pino({
  name: 'AuthService',
});

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.REACT_APP_API_URL}/authentication/google-callback`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<string> {
    const { emails } = profile;
    const email = emails[0].value;

    return this.authenticationService.validateThirdPartyUser(
      email,
      profile['_json'],
    );
  }
}
