import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { Tag } from "./tag.entity";


@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
    ){}

    async findOneOrFail(condition): Promise<Tag> {
        return this.tagRepository.findOneOrFail(condition);
      }
    
    async create(tag: CreateTagDto): Promise<Tag> {
        const isExitTag = await this.tagRepository.findOne({name: tag.name});
        if(isExitTag){
            throw new BadRequestException('This tag is exit!');
        }
        const initialTag = await this.tagRepository.create(tag);
        return this.tagRepository.save(initialTag);
    }

    async delete(id): Promise<DeleteResult> {
        const isExitTag = await this.tagRepository.findOne({ id: id});
        if(!isExitTag){
            throw new BadRequestException('This tag is not exit!');
        }
        return this.tagRepository.delete(id);
      }
}