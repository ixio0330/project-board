import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { tokenInfo } from '../../../.env/env';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
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
    private readonly jwtService: JwtService,
  ) {}
  private tokenInfo = tokenInfo;

  async login(loginDto: LoginDto) {
    const user = await this.usersService.verifyPassword(loginDto);
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  makeTokens(user: User) {
    return {
      accessToken: this.getToken('access', user),
      refreshToken: this.getToken('refresh', user),
    };
  }

  private getToken(tokenType: 'access' | 'refresh', user: User) {
    // User가 아닌 user.id, role만 받으면 됨.
    const payload = {
      id: user.id,
      type: tokenType === 'access' ? 'access' : 'refresh',
      // role 추가
    };

    const options: JwtSignOptions = {
      algorithm: 'HS256',
      issuer: 'admin',
      expiresIn: tokenType === 'access' ? 60 : 3600,
    };

    return this.jwtService.sign(payload, options);
  }

  verifyRefreshToken(token: string) {
    try {
      const result = this.jwtService.verify(token);
      if (result.type === 'refresh') {
        // 새로운 토큰 발급해서 반환.
        // return this.getToken('access');
      }
      console.log(result);
    } catch (err) {
      console.log('토큰 만료됨');
    }
  }

  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    if (plainPassword !== hashedPassword) {
      throw new BadRequestException('잘못된 인증 정보');
    }
  }
}
