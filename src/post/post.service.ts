import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SearchPostDto } from './dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.entity';
import { CreatePostResponse, SearchPostResponse } from './post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async createPost(body: CreatePostDto): Promise<CreatePostResponse> {
    const post = await this.postRepository.create(body);
    await this.postRepository.save(post);
    return {
      id: post.id,
      message: 'success',
    };
  }

  findOne(id, options = { relations: ['comments'] }): Promise<Posts> { 
    return this.postRepository.findOne(id, options);
  }

  updatePost(id: number, body: UpdatePostDto): Promise<UpdateResult> {
    const postUpdate = new Posts();

    if (body.title) postUpdate.title = body.title;
    if (body.content) postUpdate.content = body.content;

    return this.postRepository.update(id, postUpdate);
  }

  async searchPost(searchPost: SearchPostDto): Promise<SearchPostResponse> {
    const posts = await this.postRepository.find({
      where: { title: searchPost.title },
    });
    return {
      posts: posts,
    };
  }
}
