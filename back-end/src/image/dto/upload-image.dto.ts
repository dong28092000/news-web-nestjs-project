import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    default: 6
  })
  postId: number;

  @IsOptional()
  url: string;
}
