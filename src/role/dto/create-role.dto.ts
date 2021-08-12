import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class RoleCreateDto {
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    default: 6
  })
  permission: number;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: 'MANAGER'
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    type: String,
    default: 'manage system'
  })
  description: string;
}
