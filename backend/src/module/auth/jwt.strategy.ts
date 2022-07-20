import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { tokenInfo } from '../../../env/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: tokenInfo.JWT_SECREAT_KEY,
      ignoreExpiration: false,
    });
  }
  async validate(payload: { id: string }) {
    const found = this.usersService.findById(payload.id);
    console.log(found);
    // accessToken인지 한번 더 검증하기
    return found;
  }
}
