import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CryptoService } from '../crypto/crypto.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { tokenInfo } from '../../../env/env';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      session: false,
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: tokenInfo.JWT_SECREAT_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    MailService,
    CryptoService,
    JwtStrategy,
  ],
})
export class AuthModule {}
