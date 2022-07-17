import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getTodayTimestamp } from '../../helper/timestamp';
import { MailService } from '../mail/mail.service';
import * as uuid from 'uuid';
import { EnumUserRole } from './entities/user.role.entity';
import { PasswordService } from '../password/password.service';

enum EnumUserUnique {
  eamil = '이메일',
  id = '아이디',
  nickname = '닉네임',
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService,
  ) {}

  // 생성
  async create(createUserDto: CreateUserDto) {
    // 이메일 중복 체크
    this.userExistCheck(EnumUserUnique.eamil, createUserDto.email);
    // 아이디 중복 체크
    this.userExistCheck(EnumUserUnique.id, createUserDto.id);
    // 닉네임 중복 체크
    this.userExistCheck(EnumUserUnique.nickname, createUserDto.nickname);
    // 관리자일 경우 체크
    if (createUserDto.role === EnumUserRole.admin) {
      this.adminExistCheck();
    }
    // 비밀번호 암호화
    const { password, salt } = await this.passwordService.cipher(
      createUserDto.password,
    );

    // 가입인증 이메일 발송
    // return await this.mailService.sendVerificationMail(
    //   createUserDto.email,
    //   uuid.v1(),
    // );

    // 사용자 추가
    const user: User = {
      ...createUserDto,
      password,
      salt,
      created_on: getTodayTimestamp(),
    };
    this.saveUser(user);
  }

  // 수정
  update(id: string, updateUserDto: UpdateUserDto): User {
    const updateUser = this.findById(id);
    const user = {
      ...updateUser,
      ...updateUserDto,
      updated_on: getTodayTimestamp(),
    };
    this.users.push(user);
    return user;
  }

  // 삭제
  remove(id: string): User[] {
    this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }

  // 전체 조회
  findAll(): User[] {
    return this.users;
  }

  // 특정 조회
  findById(id: string): User {
    const found = this.users.find((user) => user.id === id);
    if (!found) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    return found;
  }

  // 관리자 체크
  isAdmin(id: string) {
    const found = this.users.find((user) => user.id === id);
    if (found.role !== EnumUserRole.admin) {
      throw new BadRequestException('관리자가 아닙니다.');
    }
  }

  // 관리자 중복 체크
  adminExistCheck() {
    const found = this.users.find((user) => user.role === EnumUserRole.admin);
    if (found) {
      throw new BadRequestException('이미 관리자가 존재합니다.');
    }
  }

  // 중복 체크
  userExistCheck(type: EnumUserUnique, value: string) {
    const found = this.users.find((user) => user[type] === value);
    if (found) {
      throw new BadRequestException(`이미 존재하는 ${type}입니다.`);
    }
  }

  // 추가
  saveUser(user: User) {
    this.users.push(user);
  }
}
