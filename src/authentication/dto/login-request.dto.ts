import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    default: 'nguyenquangdong28092000@gmail.com'
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '123456'
  })
  password: string;
}
