import { Body, Controller, Post } from '@nestjs/common';
import { ValidatorPipe } from 'src/common/pipes/validator.pipe';
import {
  ILogin,
  ISignUp,
  loginSchema,
  signUpSchema,
} from 'src/authentication/authentication.dto';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/signup')
  signUp(
    @Body(new ValidatorPipe(signUpSchema)) body: ISignUp,
  ): Promise<{ token: string }> {
    return this.authenticationService.signUp(body);
  }

  @Post('/login')
  login(
    @Body(new ValidatorPipe(loginSchema)) body: ILogin,
  ): Promise<{ token: string }> {
    return this.authenticationService.login(body);
  }
}
