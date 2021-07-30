import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './post.entity';
import { CommentModule } from '../comment/comment.module';

@Module({
    imports: [TypeOrmModule.forFeature([Posts]), CommentModule],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {};
     