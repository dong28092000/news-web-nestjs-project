import { IsOptional } from 'class-validator';

export class UpdatePostDto {
    id: number;

    @IsOptional()
    title: string;

    @IsOptional()
    content: string;
}