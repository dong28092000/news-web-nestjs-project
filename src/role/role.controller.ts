import {
    Controller,
    UseGuards,
    Get,
    Param,
    Body,
    Post,
    Put,
    NotFoundException,
    Delete,
  } from '@nestjs/common';
  import { JwtAuthenticationGuard } from '../authentication/jwt.guard';
  import { RoleService } from './role.service';
  import { Role } from './role.entity';
  import { RoleCreateDto, RoleUpdateDto } from './dto/index';
  import { DeleteResult } from 'typeorm';
  import { Permission } from '../common/decorator';
  import { CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE } from '../common/constant';
  import { PermissionGuard } from '../authentication/permission.guard';

  @Controller('roles')
  @UseGuards(JwtAuthenticationGuard)
  export class RoleController {
    constructor(private readonly roleService: RoleService) {}
  
    @Get(':id')
    getRole(@Param('id') id): Promise<Role> {
      return this.roleService.findOne(id);
    }
  
    @Post()
    @Permission(CREATE_ROLE)
    @UseGuards(PermissionGuard)
    async createRole(@Body() roleCreate: RoleCreateDto): Promise<Role> {
      return this.roleService.createRole(roleCreate);
    }
  
    @Put(':id')
    @Permission(UPDATE_ROLE)
    @UseGuards(PermissionGuard)
    async updateRole(
      @Param('id') id,
      @Body() roleUpdate: RoleUpdateDto,
    ): Promise<Role> {
      const exitsRole = await this.roleService.findOne(id);
      if (!exitsRole) {
        throw new NotFoundException('Cannot found role!');
      }
      roleUpdate.id = +id;                                  // convert string to number
      return this.roleService.updateRole(roleUpdate);
    }
  
    @Get()
    getAllRole(): Promise<Role[]> {
      return this.roleService.findAllRole();
    }
  
    @Delete(':id')
    @Permission(DELETE_ROLE)
    @UseGuards(PermissionGuard)
    deleteRole(@Param('id') id): Promise<DeleteResult> {
      return this.roleService.deleteRole(id);
    }
  }