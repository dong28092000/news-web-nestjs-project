import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  RegisterResponse,
  LoginResponse,
  TokenPayload,
} from './authentication.interface';
import * as bcrypt from 'bcrypt';
import { LoginRequest, RegisterRequest } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterRequest): Promise<RegisterResponse> {
    const user = await this.userService.findOne(body);
    if (user) {
      throw new BadRequestException('User with that email already exists');
    }
    const hashedPass = await bcrypt.hash(body.password, 10);
    const createdUser = await this.userService.create({
      ...body,
      password: hashedPass,
    });
    return {
      id: createdUser.id,
      message: 'success',
    };
  }

  public generateJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return token;
  }

  public generateJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    return token;
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<boolean> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.userService.setCurrentRefreshToken(
      currentHashedRefreshToken,
      userId,
    );
  }

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('Could not found user');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong password!');
    }
    return user;
  }
}
