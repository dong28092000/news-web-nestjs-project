import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  encryptAES(data: string): string {
    const key = crypto
      .createHash('sha256')
      .update(process.env.SECRET_STRING)
      .digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = cipher.update(data);
    const result = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + '-' + result.toString('hex');
  }

  decryptAES(token: string): string {
    const key = crypto
      .createHash('sha256')
      .update(process.env.SECRET_STRING)
      .digest();
    const textParts = token.split('-');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = decipher.update(encryptedText);
    const result = Buffer.concat([decrypted, decipher.final()]);
    return result.toString();
  }
}
