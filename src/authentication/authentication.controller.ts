import { Controller, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { ForgotPasswordResponse, RegisterResponse } from './authentication.interface';
import { AuthenticationService } from './authentication.service';
import { RegisterRequest, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest } from './dto';
import { LocalAuthenticationGuard } from './local.guard';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  registerManager(@Body() body: RegisterRequest): Promise<RegisterResponse> {
    return this.authenticationService.register(body);
  }
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async loginManager(@Req() request) {
    const { user } = request;
    const accessTokenCookies =
      this.authenticationService.getCookiesWithJwtAccessToken(user.id);

    const refreshTokenCookies =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.authenticationService.setCurrentRefreshToken(
      refreshTokenCookies.token,
      user.id,
    );

    request.res.setHeader('Set-Cookie', [
      accessTokenCookies,
      refreshTokenCookies.cookie,
    ]);
    return user;
  }

  @Post('forgot-password')
  forgotPasswordManager(
    @Body() body: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    console.log(body)
    return this.authenticationService.forgotPassword(body);
  }

  @Post('verify-forgot-password')
  verifyForgotPasswordManager(
    @Body() body: ResetPasswordRequest,
  ): Promise<boolean> {
    return this.authenticationService.verifyForgotPassword(body);
  }
}
