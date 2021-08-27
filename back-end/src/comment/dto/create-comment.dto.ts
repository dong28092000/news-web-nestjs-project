import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'Chuc mung ban!',
  })
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    default: 77,
  })
  postId: number;
}
