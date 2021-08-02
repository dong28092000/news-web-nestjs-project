import {
  Injectable, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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

  async findOneOrFail(condition): Promise<User> {
    return this.userRepository.findOneOrFail(condition);
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

  async getById(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new NotFoundException('user does not exit!');
  }

  resetPassword(id: number, newHashedPassword: string): Promise<UpdateResult> {
    return this.userRepository.update(id, { password: newHashedPassword });
  }
}
