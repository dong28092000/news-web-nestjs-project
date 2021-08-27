import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getOne(condition) {
    return this.tagRepository.findOne(condition);
  }

  async create(tag: CreateTagDto): Promise<Tag> {
    const isExitTag = await this.tagRepository.findOne({ name: tag.name });
    if (isExitTag) {
      throw new BadRequestException('This tag is exit!');
    }
    const initialTag = await this.tagRepository.create(tag);
    return this.tagRepository.save(initialTag);
  }

  async delete(id: number): Promise<DeleteResult> {
    const isExitTag = await this.tagRepository.findOne(id);
    if (!isExitTag) {
      throw new BadRequestException('This tag is not exit!');
    }
    return this.tagRepository.delete(id);
  }

  async update(id, body): Promise<UpdateResult> {
    const isExitTag = await this.tagRepository.findOne(id);
    if (!isExitTag) {
      throw new BadRequestException('This tag is not exit!');
    }
    const updatedTag = new Tag();
    if (body.name) updatedTag.name = body.name;
    return this.tagRepository.update(id, updatedTag);
  }
}
