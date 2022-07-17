import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth, mailBaseUrl } from '../../../.env/env';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { getRandomNumber } from '../../helper/randomNumber';

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
      // 이메일 보내는 비용으로 인해 주석처리
      // await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
    this.transporter.close();
    return this.authNumber;
  }
}
