import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/regist')
  requestRegist(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/access')
  verifyAccessToken(@Headers() header: any) {
    return this.authService.verifyAccessToken(header.authorization);
  }

  @Post('/refresh')
  reissuingToken(@Headers() header: any) {
    return this.authService.reissuingToken(header.authorization);
  }

  @Post('/password')
  resetPassword(
    @Headers() header: any,
    @Body()
    body: {
      oldPassword: string;
      newPassword: string;
    },
  ) {
    console.log(body);
    return this.authService.resetPassword(header.authorization, body);
  }

  // @Post('/regist/:authNumber')
  // regist(@Param('authNumber', ParseIntPipe) authNumber: number) {
  //   return this.authService.regist(authNumber);
  // }
}
