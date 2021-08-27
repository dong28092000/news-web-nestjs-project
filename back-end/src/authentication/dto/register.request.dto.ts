import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterRequest {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'dong',
  })
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'nguyen',
  })
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    default: 'nguyenquangdong28092000@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '123456',
  })
  password: string;
}
