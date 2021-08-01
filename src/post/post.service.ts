import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { SearchPostDto } from './dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.entity';
import { CreatePostResponse, SearchPostResponse } from './post.interface';
import { TagService } from '../tag/tag.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    private readonly tagService: TagService,
  ) {}

  async createPost(user: User, body: CreatePostDto, tagId: number): Promise<CreatePostResponse> {
    const post = await this.postRepository.create(body);
    post.userId = user.id;
    console.log(post)
    console.log(tagId);
    const tag = await this.tagService.findOneOrFail({id: tagId});
    console.log(tag)
    post.tags = [tag];
    await this.postRepository.save(post);
    return {
      id: post.id,
      message: 'success',
    };
  }

  findOne(id, options = { relations: ['comments', 'user', 'tags'] }): Promise<Posts> { 
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
