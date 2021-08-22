import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ){}

    async create(comment: CreateCommentDto): Promise<Comment>{  
        const inititalComment = await this.commentRepository.create(comment);
        return this.commentRepository.save(inititalComment);
    }

    async delete(id: number): Promise<DeleteResult> {
        const isExitComment = await this.commentRepository.findOne(id);
        if(!isExitComment){
            throw new BadRequestException('This comment is not exit!');
        }
        return this.commentRepository.delete(id);
      }
}

