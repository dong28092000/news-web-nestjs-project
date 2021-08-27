import { Module } from '@nestjs/common';
import { EmailModule } from '../email.module';
import { MailTasksService } from './mail.task';

@Module({
  imports: [EmailModule],
  providers: [MailTasksService],
})
export class TaskModule {}
