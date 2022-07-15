import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getTodayTimestamp } from '../../helper/timestamp';
import { MailService } from '../mail/mail.service';
import * as uuid from 'uuid';
import { EnumUserRole } from './entities/user.role.entity';
import { PasswordService } from '../password/password.service';
import { ResponseService } from '../response/response.service';
import { ResponseUserDto } from './dto/response-user.dto';
enum EnumUserUnique {
  eamil = '이메일',
  userId = '사용자 아이디',
  userName = '사용자 닉네임',
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 0;
  private user = {} as User;
  private initUser: User = {
    email: '',
    id: this.id,
    role: EnumUserRole.user,
    password: '',
    uesrName: '',
    userId: '',
    salt: '',
  };

  constructor(
    private readonly mailService: MailService,
    private readonly passwordService: PasswordService,
    private readonly responseSerivce: ResponseService,
  ) {}

  // 가입
  async regist(createUserDto: CreateUserDto): Promise<number> {
    // 사용자 정보 초기화
    this.user = { ...this.initUser };
    // 이메일 중복 체크
    this.userExistCheck(EnumUserUnique.eamil, createUserDto.email);
    // 아이디 중복 체크
    this.userExistCheck(EnumUserUnique.userId, createUserDto.userId);
    // 닉네임 중복 체크
    this.userExistCheck(EnumUserUnique.userName, createUserDto.uesrName);
    // 관리자일 경우 체크
    if (createUserDto.role === EnumUserRole.admin) {
      this.adminExistCheck();
    }
    // 비밀번호 암호화
    const { password, salt } = await this.passwordService.cipher(
      createUserDto.password,
    );
    // 사용자 정보 저장 (아이디, 생성날짜)
    this.user = {
      ...createUserDto,
      password,
      salt,
      id: 0,
    };
    // 가입인증 이메일 발송
    return await this.mailService.sendVerificationMail(
      createUserDto.email,
      uuid.v1(),
    );
  }

  // 생성
  async create(authNumber: number) {
    // 인증번호 확인
    this.mailService.verifyAuthNumber(authNumber);
    // 사용자 정보 저장 (생성 날짜)
    this.user = {
      ...this.user,
      created_on: getTodayTimestamp(),
    };
    // 사용자 추가
    this.saveUser(this.user);
    // id 증가
    this.id++;

    const responseUserData: ResponseUserDto = {
      email: this.user.email,
      role: this.user.role,
      uesrName: this.user.uesrName,
      userId: this.user.userId,
    };

    return this.responseSerivce.sendResponse({
      message: '회원가입에 성공했습니다.',
      data: responseUserData,
    });
  }

  // 수정
  update(id: number, updateUserDto: UpdateUserDto): User {
    const updateUser = this.findOne(id);
    const user = {
      ...updateUser,
      ...updateUserDto,
      updated_on: getTodayTimestamp(),
    };
    this.users.push(user);
    return user;
  }

  // 삭제
  remove(id: number): User[] {
    this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }

  // 전체 조회
  findAll(): User[] {
    return this.users;
  }

  // 특정 조회
  findOne(id: number): User {
    const found = this.users.find((user) => user.id === id);
    if (!found) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    return found;
  }

  // 관리자 체크
  isAdmin(id: number) {
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
