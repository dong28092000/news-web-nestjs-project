import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchPostDto {
    @IsOptional()
    @ApiProperty({
        type: String,
        default: 'Hello'
    })
    title: string;
}