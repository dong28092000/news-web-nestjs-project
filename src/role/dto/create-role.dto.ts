import { IsNotEmpty, IsOptional } from 'class-validator';
export class RoleCreateDto {
  @IsNotEmpty()
  permission: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}
