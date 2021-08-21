import { IsNotEmpty, IsOptional } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  postId: number;

  @IsOptional()
  url: string;
}
