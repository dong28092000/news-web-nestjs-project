import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  RegisterResponse,
  TokenPayload,
  ForgotPasswordResponse,
} from './authentication.interface';
import * as bcrypt from 'bcrypt';
import { LoginRequest, RegisterRequest, ResetPasswordRequest } from './dto';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../common/services/otp.service';
import { EncryptionService } from '../common/services/encryption.service';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly encryptionService: EncryptionService,
    private readonly emailService: EmailService,
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

  public getCookiesWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}; SameSite=None; Secure`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}; SameSite=None; Secure`;
    return {
      cookie,
      token,
    };
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

  async forgotPassword({ email }): Promise<ForgotPasswordResponse> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('Cannot found email');
    }
    const forgotPasswordToken =
      await this.otpService.createForgotPasswordToken();
    const data = `${email}-${forgotPasswordToken}`;
    const encryptData = this.encryptionService.encryptAES(data);
    const url = `${process.env.FRONT_END_URL}/verify-forgot-password/?token=${encryptData}`;
    const parameterEmails = {
      to: [email.toLowerCase()],
      subject: `Request reset password`,
      html: `<a href="${url}">Click here</a> for reset password`,
    };
    await this.emailService.sendEmail(parameterEmails);

    return { url };
  }

  async verifyForgotPassword(body: ResetPasswordRequest): Promise<boolean> {
    const decryptedToken = this.encryptionService.decryptAES(body.token);
    const [email, forgotPasswordToken] = decryptedToken.split('-');
    const user = await this.userService.findOneOrFail({ email });
    if (!user) {
      throw new NotFoundException('Cannot found email');
    }
    const check = await this.otpService.verifyForgotPasswordToken(
      forgotPasswordToken,
    );
    if (!check) {
      throw new BadRequestException('Invalid token');
    }
    const newHashedPassword = await bcrypt.hash(body.password, 10);

    await this.userService.resetPassword(user.id, newHashedPassword);

    return true;
  }
}
