import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  verifyAccessToken(@Body() body: { token: string }) {
    return this.authService.verifyAccessToken(body.token);
  }

  @Post('/refresh')
  reissuingToken(@Body() body: { token: string }) {
    return this.authService.reissuingToken(body.token);
  }

  // @Post('/regist/:authNumber')
  // regist(@Param('authNumber', ParseIntPipe) authNumber: number) {
  //   return this.authService.regist(authNumber);
  // }
}
