import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        default: 'Sport',
    })
    name: string;
}