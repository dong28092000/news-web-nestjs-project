import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordRequest {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: '234567',
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default:
      '169ec2b0e9e82e846201208caa988524-aabc1d01c5d8d9d4d7fd15d8d60c6bccf8478a65ba5585dd537b9199ea2f42f09493bb57d50f4f456290a75ee7f443b5',
  })
  token: string;
}
