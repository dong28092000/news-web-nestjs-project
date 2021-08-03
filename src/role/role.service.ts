import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { PermissionService } from '../permission/permission.service';
  import { DeleteResult, Repository } from 'typeorm';
  import { RoleCreateDto, RoleUpdateDto } from './dto';
  import { Role } from './role.entity';
  @Injectable()
  export class RoleService {
    constructor(
      @InjectRepository(Role)
      private readonly roleRepository: Repository<Role>,
      private readonly permissionService: PermissionService,
    ) {}
  
    findOne(id, options = { relations: ['permissions'] }): Promise<Role> {
      return this.roleRepository.findOne(id, options);
    }
  
    async createRole(roleCreate: RoleCreateDto): Promise<Role> {
      const permission = await this.permissionService.findOne({
        id: roleCreate.permission,
      });
      if (!permission) {
        throw new NotFoundException('Cannot found permission!');
      }
      const isExitsRole = await this.findOne({ name: roleCreate.name });
      if (isExitsRole) {
        throw new BadRequestException('Role is exist!');
      }
      const role = this.roleRepository.create(roleCreate);
      role.permissions = [permission];
      return this.roleRepository.save(role);
    }
  
    updateRole(roleUpdate: RoleUpdateDto): Promise<Role> {
      const role = this.roleRepository.create(roleUpdate);
      return this.roleRepository.save(role);
    }
  
    findAllRole(options = { relations: ['permissions'] }): Promise<Role[]> {
      options['select'] = ['id', 'name'];
      return this.roleRepository.find(options);
    }
  
    async deleteRole(id): Promise<DeleteResult> {
      const role = await this.findOne(id);
      return this.roleRepository.delete(id);
    }
  }
  