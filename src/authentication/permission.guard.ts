import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionAccept = this.reflector.get<number[]>(                     
      'permission',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const userInformation = await this.userService.findOneOrFail(userId);
    let permissionAssigned = [];
    userInformation.roles.forEach(
      (role) =>
        (permissionAssigned = permissionAssigned.concat(role.permissions)),       
    );
    return permissionAssigned.some(
      (permission) => permission.id === permissionAccept,                     
    );
  }
}