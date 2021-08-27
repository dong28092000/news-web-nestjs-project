import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles, UserDecorator } from '../common/decorator';
import { JwtAuthenticationGuard } from '../authentication/jwt.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import { RolesGuard } from '../authentication/role.guard';
import { ADMIN, USER } from '../common/constant';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profile')
@UseGuards(JwtAuthenticationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(USER)
  @UseGuards(RolesGuard)
  async getProfile(@UserDecorator() user): Promise<User> {
    return this.userService.findOneOrFail(user.id);
  }

  @Delete(':id')
  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  async deleteAccount(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteAccount(id);
  }
}
