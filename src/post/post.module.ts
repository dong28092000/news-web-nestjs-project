import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { CommentModule } from '../comment/comment.module';
import { TagModule } from '../tag/tag.module';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Posts, Tag]), CommentModule, TagModule],
    controllers: [PostController],
    providers: [PostService, TagService],
    exports: [PostService],
})
export class PostModule {};
     