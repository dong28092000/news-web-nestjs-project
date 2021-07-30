import { Body, Controller, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.entity";

@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ){}

    @Post()
    async createComment(@Body() comment: CreateCommentDto): Promise<Comment> {
        return this.commentService.create(comment);
    }
}