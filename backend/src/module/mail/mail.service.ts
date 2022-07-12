import { Injectable } from '@nestjs/common';
import { auth, mailBaseUrl } from '../../../.env/env';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth,
    });
  }

  async sendVerificationMail(emailAddress: string, singupToken: string) {
    const url = `${mailBaseUrl}/users/email-verify?signupVerifyToken=${singupToken}`;
    const authNumber = Math.floor(Math.random() * 10000);

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        아래 숫자를 입력하면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          ${authNumber}
        </form>
      `,
    };

    const response = {
      data: null,
      error: null,
      authNumber,
    };

    try {
      const res = await this.transporter.sendMail(mailOptions);
      response.data = res;
    } catch (err) {
      response.error = err;
    } finally {
      this.transporter.close();
      return response;
    }
  }
}
