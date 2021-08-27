import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'Sport',
  })
  name: string;
}
