import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface EmailParams {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text?: string;
  html?: string;
}
@Injectable()
export class EmailService {
  private readonly transporter = null;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(parameters: EmailParams): Promise<any> {
    console.log(parameters);
    const fields = {
      from: process.env.SMTP_FROM,
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      text: '',
      html: '',
      attachments: [],
    };
    const message = Object.assign(fields, parameters);
    return this.transporter.sendMail(message).catch((error) => {
      throw new InternalServerErrorException(
        `Can't send to email cause: ${error.message}`,
      );
    });
  }
}
