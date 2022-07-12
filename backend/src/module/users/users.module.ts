import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from 'src/module/mail/mail.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService],
})
export class UsersModule {}
