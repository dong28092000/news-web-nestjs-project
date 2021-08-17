import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(file, body: UploadImageDto): Promise<Image> {
    const newImage = await this.imageRepository.create(body);
    newImage.imageFile = file.filename;
    newImage.url = `http://localhost:3000/api/images/${newImage.imageFile}`;
    return this.imageRepository.save(newImage);
  }

  async getByFileNanme(name): Promise<Image> {
    return await this.imageRepository.findOne({
      where: { imageFile: name}
    });
}
}
