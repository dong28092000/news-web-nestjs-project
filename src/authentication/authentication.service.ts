import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterResponse } from './authentication.interface';
import { RegisterRequest } from './dto/register.request.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async register(body: RegisterRequest): Promise<RegisterResponse> {
    try {
      const createdUser = await this.userService.create(body);
      return {
        id: createdUser.id,
        message: 'success',
      };
    } catch (error) {
        throw new HttpException(
            'Something went wrong',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
