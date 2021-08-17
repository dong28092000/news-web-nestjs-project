import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/image/image-upload',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadImageDto): Promise<Image> {
    const image = await this.imageService.create(file, body);
    return image;
  }

  @Get(':imgPath')
  seeUploadedFile(@Param('imgPath') image, @Res() res) {
    const isImageExit = this.imageService.getByFileNanme(image);
    if(!isImageExit) {
      throw new NotFoundException('this image does not exit!');
    }
    return res.sendFile(image, { root: './src/image/image-upload' });
  }
}
