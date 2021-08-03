import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionAccept = this.reflector.get<number[]>(                     
      'permission',
      context.getHandler(),
    );
    console.log(permissionAccept)
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    console.log(userId)
    const userInformation = await this.userService.findOneOrFail(userId);
    console.log(userInformation) 
    let permissionAssigned = [];
    userInformation.roles.forEach(
      (role) =>
        (permissionAssigned = permissionAssigned.concat(role.permissions)),       // loi mang lai voi nhau
    );
    return permissionAssigned.some(
      (permission) => permission.id === permissionAccept,                     // check neu dung thi return true
    );
  }
}