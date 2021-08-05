import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const user = request.user;

      if (!user) {
        throw new NotFoundException('user does not exit!');
      }

      const existingUser = await this.userService.findOneOrFail({
        id: user.id,
      });

      if (!existingUser) {
        throw new NotFoundException('user does not exit!');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
