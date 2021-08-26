import {
  Controller,
  UseGuards,
  Get,
  Param,
  Body,
  Post,
  NotFoundException,
  Delete,
  Query,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/jwt.guard';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { RoleCreateDto, RoleUpdateDto } from './dto/index';
import { DeleteResult } from 'typeorm';
import { Permission, Roles } from '../common/decorator';
import { CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE, ADMIN } from '../common/constant';
import { UserService } from '../user/user.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../authentication/role.guard';


@ApiTags('roles')
@Roles(ADMIN)
@UseGuards(RolesGuard)
@Controller('roles')
@UseGuards(JwtAuthenticationGuard)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
      async getRole(@Param('id') id: string): Promise<Role> {
        const role = await this.roleService.findOne(id);
        if (!role) {
          throw new NotFoundException('this role does not exit!');
        }
        return role;
      }

  @Post()
      async createRole(@Body() roleCreate: RoleCreateDto): Promise<Role> {
        console.log('sdfsad');
        return this.roleService.createRole(roleCreate);
      }

  @Patch(':id')
      async updateRole(
        @Param('id') id: string,
        @Body() roleUpdate: RoleUpdateDto,
      ): Promise<Role> {
        const exitsRole = await this.roleService.findOne(id);
        if (!exitsRole) {
          throw new NotFoundException('Cannot found role!');
        }
        roleUpdate.id = +id; // convert string to number
        return this.roleService.updateRole(roleUpdate);
      }

  @Patch()
      @ApiQuery({ name: 'userId'})
      @ApiQuery({ name: 'roleId'})
      async updateRoleForUser(@Query('userId') userId, @Query('roleId') roleId) {
        roleId = +roleId;
        const isExitUser = await this.userService.findOneOrFail(userId);
        if(!isExitUser) {
          throw new NotFoundException('This user does not exit!');
        }
        
        const isExitsRole = await this.roleService.findOne(roleId);
        if(!isExitsRole) {
          throw new NotFoundException('this role does not exit!');
        }
        const checkRoleOfUser = isExitUser.roles.some(role => role.id === roleId);
        if(checkRoleOfUser) {
          throw new BadRequestException('user already has this role!');
        }
        isExitUser.roles.push(isExitsRole);
        return this.userService.updateRole(isExitUser);
      }

  @Get()
      getAllRole(): Promise<Role[]> {
        return this.roleService.findAllRole();
      }

  @Delete(':id')
      deleteRole(@Param('id') id: string): Promise<DeleteResult> {
        return this.roleService.deleteRole(id);
      }
}
