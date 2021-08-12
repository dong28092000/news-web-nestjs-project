import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    default: 'nguyenquangdong28092000@gmail.com'
  })
  email: string;
}
