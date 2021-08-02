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
  
  @Controller('roles')
  @UseGuards(JwtAuthenticationGuard)
  export class RoleController {
    constructor(private readonly roleService: RoleService) {}
  
    @Get(':id')
    getRole(@Param('id') id): Promise<Role> {
      return this.roleService.findOne(id);
    }
  
    @Post()
    async createRole(@Body() roleCreate: RoleCreateDto): Promise<Role> {
      return this.roleService.createRole(roleCreate);
    }
  
    @Put(':id')
    async updateRole(
      @Param('id') id,
      @Body() roleUpdate: RoleUpdateDto,
    ): Promise<Role> {
      const exitsRole = await this.roleService.findOne(id);
      if (!exitsRole) {
        throw new NotFoundException('Cannot found role!');
      }
      roleUpdate.id = +id;
      return this.roleService.updateRole(roleUpdate);
    }
  
    @Get()
    getAllRole(): Promise<Role[]> {
      return this.roleService.findAllRole();
    }
  
    @Delete(':id')
    deleteRole(@Param('id') id): Promise<DeleteResult> {
      return this.roleService.deleteRole(id);
    }
  }