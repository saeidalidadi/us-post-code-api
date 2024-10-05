import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, createHash } from 'node:crypto';

@Injectable()
export class EncryptDecrypt {
  private key: string;
  private iv: string;

  constructor(private readonly config: ConfigService) {
    this.key = createHash('sha512')
      .update(this.config.get('crypto.secret_key'))
      .digest('hex')
      .substring(0, 32);
    this.iv = createHash('sha512')
      .update(this.config.get('crypto.secret_iv'))
      .digest('hex')
      .substring(0, 16);
  }

  encryptData(data: string) {
    const algorithm = this.config.get('crypto.algorithm');
    const cipher = createCipheriv(algorithm, this.key, this.iv);
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
  }

  decryptData(data: string) {
    const algorithm = this.config.get('crypto.algorithm');
    const decipher = createDecipheriv(algorithm, this.key, this.iv);
    let decrypted =
      decipher.update(data, 'hex', 'utf-8') + decipher.final('utf-8');

    return decrypted;
  }
}
