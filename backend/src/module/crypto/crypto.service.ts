import { Injectable } from '@nestjs/common';
const crypto = require('crypto');

@Injectable()
export class CryptoService {
  private createSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err: any, buf: any) => {
        if (err) buf(err);
        resolve(buf.toString('base64'));
      });
    });
  }

  cipher(password: string): Promise<{ password: string; salt: string }> {
    return new Promise((resolve, reject) => {
      this.createSalt()
        .then((salt: string) => {
          crypto.pbkdf2(
            password,
            salt,
            9999,
            64,
            'sha512',
            (err: any, key: any) => {
              if (err) reject(err);
              resolve({ password: key.toString('base64'), salt: salt });
            },
          );
        })
        .catch(console.log);
    });
  }

  decipher(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        9999,
        64,
        'sha512',
        (err: any, key: any) => {
          if (err) reject(err);
          resolve(key.toString('base64'));
        },
      );
    });
  }
}
