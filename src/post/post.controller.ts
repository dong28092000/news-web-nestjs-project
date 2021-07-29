import { Controller, Post, Body, Get, Param, NotFoundException, Patch } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostResponse } from './post.interface';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdateResult } from 'typeorm';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async createPost(@Body() body: CreatePostDto): Promise<CreatePostResponse> {
    return this.postService.createPost(body);
  }

  @Get(':id')
  async viewDetail(@Param() id): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async editPosts(@Param() id, @Body() body: UpdatePostDto): Promise<UpdateResult> {
    const postExits = this.postService.findOne(id);
    if(!postExits) {
        throw new NotFoundException('this post with id does not exit');
    }
    return this.postService.updatePost(id, body);
  }

  @Post()
  async seachPost(): 
}
