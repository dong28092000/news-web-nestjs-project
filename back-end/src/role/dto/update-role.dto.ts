import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Permission } from '../../permission/permission.entity';

export class RoleUpdateDto {
  @IsOptional()
  @ApiProperty({
    type: Array,
    default: [
      {
        id: 3,
      },
      {
        id: 2,
      },
    ],
  })
  permissions: Permission[];

  @IsOptional()
  name: string;

  id: number;
}
