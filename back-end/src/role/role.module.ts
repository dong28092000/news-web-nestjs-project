import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionModule } from '../common/services/encryption.module';
import { RoleService } from './role.service';
import { Permission } from '../permission/permission.entity';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission]), EncryptionModule],
  providers: [RoleService, PermissionService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
