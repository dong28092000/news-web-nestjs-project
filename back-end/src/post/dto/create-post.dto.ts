import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image: any;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'Hello',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'Xin chao HN',
  })
  content: string;
}
