import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterRequest } from '../authentication/dto/register.request.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: RegisterRequest): Promise<User> {
    const user = await this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findOne(condition): Promise<User> {   
   return this.userRepository.findOne({email: condition.email});
  }

  async setCurrentRefreshToken(
    currentHashedRefreshToken: string,
    userId: number,
  ): Promise<boolean> {
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });

    return true;
  }
}
