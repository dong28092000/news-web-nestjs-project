import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./comment.entity";
import { JwtAuthenticationGuard } from "../authentication/jwt.guard";

@Controller('comments')
@UseGuards(JwtAuthenticationGuard)
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ){}

    @Post()
    async createComment( @Body() comment: CreateCommentDto): Promise<Comment> {
        return this.commentService.create(comment);
    }
}