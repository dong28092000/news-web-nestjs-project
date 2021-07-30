import { IsOptional } from "class-validator";

export class SearchPostDto {
    @IsOptional()
    title: string;
}