import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from 'src/module/mail/mail.service';
import { PasswordService } from '../password/password.service';
import { ResponseService } from '../response/response.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService, PasswordService, ResponseService],
})
export class UsersModule {}
