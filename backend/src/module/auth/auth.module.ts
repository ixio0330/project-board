import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { PasswordService } from '../password/password.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, MailService, PasswordService],
})
export class AuthModule {}
