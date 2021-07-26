import {
    Controller,
    Post,
    UseInterceptors,
    Body,
    Req,
    UseGuards,
    Res,
    Get,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { RegisterRequest } from './dto/register.request.dto';
  import { RegisterResponse } from './authentication.interface';
import { AuthenticationService } from './authentication.service';
  @Controller('authentication')
  export class AuthenticationController {
      constructor( private readonly authenticationService: AuthenticationService) {}

      @Post('register')
      registerManager(@Body() body: RegisterRequest): Promise<RegisterResponse> {
        return this.authenticationService.register(body);
      }
  }


