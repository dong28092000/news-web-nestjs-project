import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { JwtAuthenticationGuard } from "../authentication/jwt.guard";
import { CreateTagDto } from "./dto/create-tag.dto";
import { Tag } from "./tag.entity";
import { UpdateTagDto } from "./tag.interface";
import { TagService } from "./tag.service";


@Controller('tags')
@UseGuards(JwtAuthenticationGuard)
export class TagController {
    constructor(
        private readonly tagService: TagService,
    ){}

    @Post()
    async createTag(@Body() tag: CreateTagDto): Promise<Tag> {
        return this.tagService.create(tag);
    }

    @Delete(':id')
    async deleteTag(@Param() id: number): Promise<DeleteResult> {
        return this.tagService.delete(id);
    }

    @Patch(':id')
    async updateTag(@Param() id, @Body() body: UpdateTagDto): Promise<UpdateResult> {
        return this.tagService.update(id, body);
    }
}
