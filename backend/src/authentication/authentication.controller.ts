import { User } from 'src/users/user.model';
import { Response, Request } from 'express';
import {
  ILogin,
  ISignUp,
  loginSchema,
  signUpSchema,
} from 'src/authentication/authentication.dto';
import { GoogleAuthGuard } from 'src/guards/google.guard';
import { ValidatorPipe } from 'src/common/pipes/validator.pipe';
import {
  Body,
  Get,
  Req,
  Res,
  Post,
  UseGuards,
  Controller,
  Redirect,
} from '@nestjs/common';
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

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  googleLogin(): void {
    console.log(process.env.BACKEND_URL, 'Google backend URL');
  }

  @Get('/google-callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() request: Request, @Res() response: Response): void {
    response.redirect(
      `${process.env.REACT_APP_FRONTEND_URL}/?token=${request.user}`,
    );
  }
}
