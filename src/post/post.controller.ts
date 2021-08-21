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
  Delete,
} from '@nestjs/common';
import { CreatePostResponse, SearchPostResponse } from './post.interface';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePostDto, UpdatePostDto, SearchPostDto } from './dto';
import { JwtAuthenticationGuard } from '../authentication/jwt.guard';
import {
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAuthenticationGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  @ApiQuery({name: 'tagId'})
  async createPost(
    @Req() { user },
    @Body() body: CreatePostDto,
    @Query('tagId') tagId
  ): Promise<CreatePostResponse> {
    return this.postService.createPost(user, body, tagId);
  }

  @Get(':id')
  async viewDetail(@Param('id') id: string): Promise<Posts> {
    return this.postService.findOne(id);
  }

  @Get()
  async getAll(): Promise<Posts[]> {
    return this.postService.findAllPosts();
  }


  @Patch(':id')
  @ApiQuery({name: 'tagId'})
  async editPosts(
    @Param('id') id: string,
    @Body() body: UpdatePostDto,
    @Query('tagId') tagId,
  ): Promise<Posts>{
    return this.postService.updatePost(id, body, tagId);
  }

  @Get()
  @ApiQuery({name: 'title'})
  async seachPost(
    @Query('title') searchPost: SearchPostDto,
  ): Promise<SearchPostResponse> {
    return this.postService.searchPost(searchPost);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.delete(id);
  }
}
