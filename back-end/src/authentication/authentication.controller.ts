import { Controller, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import {
  ForgotPasswordResponse,
  RegisterResponse,
} from './authentication.interface';
import { AuthenticationService } from './authentication.service';
import {
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  LoginRequest
} from './dto';
import { LocalAuthenticationGuard } from './local.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiCreatedResponse({description: 'success!'})
  registerManager(@Body() body: RegisterRequest): Promise<RegisterResponse> {
    return this.authenticationService.register(body);
  }


  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiBody({ type: LoginRequest })
  @ApiOkResponse({description: 'success!'})
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
  @ApiOkResponse({description: 'success!'})
  forgotPasswordManager(
    @Body() body: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    return this.authenticationService.forgotPassword(body);
  }

  @Post('verify-forgot-password')
  verifyForgotPasswordManager(
    @Body() body: ResetPasswordRequest,
  ): Promise<boolean> {
    return this.authenticationService.verifyForgotPassword(body);
  }
}


