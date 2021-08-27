import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../email.service';

@Injectable()
export class MailTasksService {
  private readonly logger = new Logger(MailTasksService.name);
  constructor(private readonly emailService: EmailService) {}

  @Cron('0 */30 * * * *')
  handleCron() {
    const parameterEmails = {
      to: [`${process.env.DEFAUL_EMAIL}`],
      subject: `Congratulations!`,
      html: `You are awesome !`,
    };
    this.logger.debug(`Sending to email: ${process.env.DEFAUL_EMAIL}`);
    this.emailService.sendEmail(parameterEmails);
  }
}
