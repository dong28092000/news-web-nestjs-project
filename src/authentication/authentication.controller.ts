import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
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
  async loginManager(@Req() request) {
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
      accessToken,
      refreshToken,
    };
  }
}
