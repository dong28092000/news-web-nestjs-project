import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  Req,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostResponse, SearchPostResponse } from './post.interface';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePostDto, UpdatePostDto, SearchPostDto } from './dto';
import { JwtAuthenticationGuard } from '../authentication/jwt.guard';
import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserDecorator } from '../common/decorator';
import { editFileName } from '../common/services/edit-file-name.service';



@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAuthenticationGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @Post()
      @ApiConsumes('multipart/form-data')
      @ApiQuery({ name: 'tagId' })
      @ApiOperation({summary: 'image'})
      @UseInterceptors(
        FileInterceptor('image', {
          storage: diskStorage({
            destination: 'public/images',
            filename: editFileName,
          }),
        }),
     )  
      async createPost(
      @UserDecorator() user ,
      @Body() body: CreatePostDto,
      @Query('tagId') tagId,
      @UploadedFile() file: Express.Multer.File,
      ): Promise<CreatePostResponse> {
        return this.postService.createPost(user, body, tagId, file);
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
      @ApiQuery({ name: 'tagId' })
      async editPosts(
        @Param('id') id: string,
        @Body() body: UpdatePostDto,
        @Query('tagId') tagId,
      ): Promise<Posts> {
        return this.postService.updatePost(id, body, tagId);
      }

  @Get()
      @ApiQuery({ name: 'title' })
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
