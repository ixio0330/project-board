import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth, mailBaseUrl } from '../../../.env/env';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { getRandomNumber } from 'src/helper/randomNumber';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private transporter: Mail;
  private authNumber = 0;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth,
    });
  }

  verifyAuthNumber(authNumber: number) {
    if (authNumber !== this.authNumber) {
      throw new BadRequestException('인증번호가 올바르지 않습니다.');
    }
    return;
  }

  async sendVerificationMail(emailAddress: string, singupToken: string) {
    const url = `${mailBaseUrl}/users/email-verify?signupVerifyToken=${singupToken}`;
    this.authNumber = getRandomNumber();

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        아래 숫자를 입력하면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          ${this.authNumber}
        </form>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        '이메일 발송중 오류가 발생했습니다.',
      );
    }
    this.transporter.close();
    return this.authNumber;
  }
}
