import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { User } from "src/user/user.entity";
import { EmailService } from "./email.service";


@Processor('message-queue')
export class MessageQueueProcessor {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly emailService: EmailService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
  }

  @Process('congratulations!')
  async sendWelcomeEmail(job: Job<{ parameterEmails: any }>): Promise<any> {
    this.logger.log(`Sending confirmation email to '${job.data.parameterEmails.to}'`)
    try {
      const result = await this.emailService.sendEmail(job.data.parameterEmails)
      return result
    } catch (error) {
      this.logger.error(`Failed to send confirmation email to '${job.data.parameterEmails.to}'`, error.stack)
      throw error
    }
  }
}