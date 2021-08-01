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
    @Query() tagId: number,
  ): Promise<CreatePostResponse> {
    return this.postService.createPost(user, body, tagId);
  }

  @Get(':id')
  async viewDetail(@Param() id): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async editPosts(
    @Param() id,
    @Body() body: UpdatePostDto,
  ): Promise<UpdateResult> {
    const postExits = this.postService.findOne(id);
    if (!postExits) {
      throw new NotFoundException('this post with id does not exit');
    }
    return this.postService.updatePost(id, body);
  }

  @Get()
  async seachPost(
    @Query() searchPost: SearchPostDto,
  ): Promise<SearchPostResponse> {
    return this.postService.searchPost(searchPost);
  }
}
