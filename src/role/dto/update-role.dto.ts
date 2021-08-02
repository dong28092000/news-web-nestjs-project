import { IsOptional } from 'class-validator';
import { Permission } from '../../permission/permission.entity';

export class RoleUpdateDto {
  @IsOptional()
  permissions: Permission[];

  @IsOptional()
  name: string;

  id: number;
}
