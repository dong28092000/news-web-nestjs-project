import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RegisterResponse } from './authentication.interface';
import { AuthenticationService } from './authentication.service';
import { RegisterRequest, LoginRequest } from './dto';
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
}
