import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { tokenInfo } from '../../../env/env';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { EnumUserRole } from '../users/entities/user.role.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

type TokenType = 'access' | 'refresh';

interface TokenPayload {
  id: string;
  role: EnumUserRole;
  type: TokenType;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.verifyPassword(loginDto);

    return {
      accessToken: this.getToken('access', user),
      refreshToken: this.getToken('refresh', user),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  reissuingToken(token: string) {
    const user: User = this.verifyRefreshToken(token);
    return {
      accessToken: this.getToken('access', user),
    };
  }

  verifyAccessToken(token: string) {
    this.verifyToken(token);
    return;
  }

  resetPassword(
    token: string,
    body: {
      oldPassword: string;
      newPassword: string;
    },
  ) {
    const payload: TokenPayload = this.verifyToken(token);
    const user = this.usersService.findById(payload.id);
    return this.usersService.resetPassword(
      user,
      body.newPassword,
      body.oldPassword,
    );
  }

  private getToken(tokenType: 'access' | 'refresh', user: User) {
    const payload: TokenPayload = {
      id: user.id,
      type: tokenType === 'access' ? 'access' : 'refresh',
      role: user.role,
    };

    const options: JwtSignOptions = {
      algorithm: 'HS256',
      issuer: 'admin',
      expiresIn:
        tokenType === 'access'
          ? tokenInfo.JWT_ACCESS_EXP
          : tokenInfo.JWT_REFRESH_EXP,
    };

    return this.jwtService.sign(payload, options);
  }

  private verifyToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new BadRequestException('????????? ???????????????.');
    }
  }

  private verifyRefreshToken(token: string) {
    const payload: TokenPayload = this.verifyToken(token);
    if (payload.type === 'access') {
      throw new BadRequestException('???????????? ?????? ???????????????.');
    }
    return this.usersService.findById(payload.id);
  }
}
