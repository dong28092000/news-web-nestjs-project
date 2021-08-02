import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
