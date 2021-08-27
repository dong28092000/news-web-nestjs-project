import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
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

  async createPost(
    user: User,
    body: CreatePostDto,
    tagId,
    file,
  ): Promise<CreatePostResponse> {
    const post = await this.postRepository.create(body);
    post.userId = user.id;
    const tag = await this.tagService.getOne({ id: tagId });
    post.tags = [tag];
    post.imageUrl = `http://localhost:3000/images/${file.filename}`;
    await this.postRepository.save(post);
    return {
      id: post.id,
      message: 'success',
    };
  }

  findOne(
    id,
    options = { relations: ['comments', 'user', 'tags'] },
  ): Promise<Posts> {
    return this.postRepository.findOne(id, options);
  }

  findAllPosts(
    options = { relations: ['comments', 'user', 'tags'] },
  ): Promise<Posts[]> {
    return this.postRepository.find(options);
  }

  async updatePost(id, body: UpdatePostDto, tagId): Promise<Posts> {
    const postExits = await this.postRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!postExits) {
      throw new NotFoundException('this post with id does not exit');
    }
    const isTagExit = postExits.tags.find((x) => x.id == tagId);
    if (isTagExit) {
      throw new BadRequestException('this tag is add to the post');
    }

    if (body.title) postExits.title = body.title;
    if (body.content) postExits.content = body.content;
    const tag = await this.tagService.getOne({ id: tagId });
    if (!tag) {
      throw new NotFoundException('this tag is not exit');
    }

    postExits.tags.push(tag);

    return this.postRepository.save(postExits);
  }

  async searchPost(searchPost: SearchPostDto): Promise<SearchPostResponse> {
    const posts = await this.postRepository.find({
      where: { title: searchPost.title },
    });
    return {
      posts: posts,
    };
  }

  async delete(id): Promise<DeleteResult> {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException('this post does not exit!');
    // const a = await getConnection()
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Comment)
    //   .where({ postId: id })
    //   .execute();
    return this.postRepository.delete(id);
  }
}
