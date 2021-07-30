import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Posts } from './post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Posts])],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {};
