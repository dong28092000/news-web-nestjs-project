import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MessageQueueService {
  constructor(@InjectQueue('message-queue') private messageQueue: Queue) {}

  async sendConfirmationEmail(parameterEmails: any): Promise<boolean> {
    try {
      await this.messageQueue.add('congratulations!', {
        parameterEmails,
      });
      return true;
    } catch (error) {
      //this.logger.error(`Error queueing confirmation email to user ${user.email}`)
      return false;
    }
  }
}
