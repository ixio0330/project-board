import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { tokenInfo } from '../../../.env/env';
import { PasswordService } from '../password/password.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EnumUserRole } from '../users/entities/user.role.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
const jwt = require('jsonwebtoken');

type TokenType = 'access' | 'refresh';

interface TokenUserInfo {
  userId: string;
  role: EnumUserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}
  private tokenInfo = tokenInfo;

  async login(loginDto: LoginDto) {
    const user = this.usersService.findById(loginDto.id);
    const hashPassword = await this.passwordService.decipher(
      user.password,
      user.salt,
    );

    if (hashPassword !== loginDto.password) {
      throw new BadRequestException('잘못된 인증 정보입니다.');
    }

    // 토큰 생성해서 반환.
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  private getToken(options: { tokenType: TokenType; userInfo: TokenUserInfo }) {
    try {
      const { tokenType, userInfo } = options;
      const tokenOptions = {
        algorithm: this.tokenInfo.JWT_ALG, // 해싱 알고리즘
        // 토큰 유효 기간
        expiresIn:
          tokenType === 'access'
            ? this.tokenInfo.JWT_ACCESS_EXP // accessToken 시간
            : this.tokenInfo.JWT_REFRESH_EXP, // refreshToken 시간
        issuer: this.tokenInfo.JWT_ISSUER, // 발행자
      };
      const token = jwt.sign(
        userInfo,
        this.tokenInfo.JWT_SECREAT_KEY,
        tokenOptions,
      );
      return token;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECREAT_KEY);
      return payload;
    } catch (err) {
      throw new BadRequestException('유효한 토큰이 아닙니다.');
    }
  }
}
