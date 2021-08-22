import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (fileName: string = 'fileImage', postId: string): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
        [postId]: {
            type: 'number',
        }
      },
    },
  })(target, propertyKey, descriptor);
};