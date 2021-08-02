import { IsNotEmpty } from 'class-validator';

export class ResetPasswordRequest {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  token: string;
}