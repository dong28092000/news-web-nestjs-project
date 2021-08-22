import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        default: 'Hello'
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        type: String,
        default: 'Xin chao HN'
    })
    content: string;
}