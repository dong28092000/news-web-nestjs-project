import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
  Query,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreatePostResponse, SearchPostResponse } from './post.interface';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { UpdateResult } from 'typeorm';
import { CreatePostDto, UpdatePostDto, SearchPostDto } from './dto';
import { JwtAuthenticationGuard } from '../authentication/jwt.guard';

@Controller('posts')
@UseGuards(JwtAuthenticationGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async createPost(
    @Req() { user },
    @Body() body: CreatePostDto,
    @Query() data,
  ): Promise<CreatePostResponse> {
    return this.postService.createPost(user, body, data);
  }

  @Get(':id')
  async viewDetail(@Param() id): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Get()
  async getAll(): Promise<Posts[]> {
    return this.postService.findAllPosts();
  }


  @Patch(':id')
  async editPosts(
    @Param() id,
    @Body() body: UpdatePostDto,
    @Query() data,
  ): Promise<Posts>{
    return this.postService.updatePost(id, body, data);
  }

  @Get()
  async seachPost(
    @Query() searchPost: SearchPostDto,
  ): Promise<SearchPostResponse> {
    return this.postService.searchPost(searchPost);
  }
}
