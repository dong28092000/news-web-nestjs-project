import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { LoginResponse, RegisterResponse } from './authentication.interface';
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
  async loginManager(@Req() request): Promise<LoginResponse> {
    const { user } = request;
    const accessToken = this.authenticationService.generateJwtAccessToken(
      user.id,
    );
    const refreshToken = this.authenticationService.generateJwtRefreshToken(
      user.id,
    );
    await this.authenticationService.setCurrentRefreshToken(
      refreshToken,
      user.id,
    );
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
