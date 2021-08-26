import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<number[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userInformation = await this.userService.findOneOrFail(user.id);
    let roleAssigned = [];
    userInformation.roles.forEach(
      (role) =>
        (roleAssigned = roleAssigned.concat(role.id)),       
    );
    return  roleAssigned.some((id) => id === requiredRoles);
  }
}
