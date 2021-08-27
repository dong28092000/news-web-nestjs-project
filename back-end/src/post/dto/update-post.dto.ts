import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  id: number;

  @IsOptional()
  @ApiProperty({
    type: String,
    default: 'Hello',
  })
  title: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    default: 'xin chao HN',
  })
  content: string;
}
