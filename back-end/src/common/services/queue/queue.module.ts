import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailModule } from '../email.module';
import { EmailService } from '../email.service';
import { MessageQueueProcessor } from './mail.processor';
import { MessageQueueService } from './mail.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    EmailModule,
  ],
  providers: [MessageQueueService, EmailService, MessageQueueProcessor],
  exports: [MessageQueueService],
})
export class MessageQueueModule {}
