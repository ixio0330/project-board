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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  login() {
    return this.authService.login('test1234', '1234');
  }

  @Post('/regist')
  requestRegist(@Body() createUserDto: CreateUserDto) {
    return this.authService.requestRegist(createUserDto);
  }

  @Post('/regist/:authNumber')
  regist(@Param('authNumber', ParseIntPipe) authNumber: number) {
    return this.authService.regist(authNumber);
  }
}
