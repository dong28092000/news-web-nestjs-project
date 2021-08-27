import { authenticator } from 'otplib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  createForgotPasswordToken(): string {
    authenticator.options = {
      window: 2880,
    };

    return authenticator.generate(process.env.OTP_SECRET);
  }
  verifyForgotPasswordToken(token: string): boolean {
    authenticator.options = {
      window: 2880,
    };

    return authenticator.check(token, process.env.OTP_SECRET);
  }
}
