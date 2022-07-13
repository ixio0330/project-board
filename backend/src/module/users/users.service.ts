import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getTodayTimestamp } from '../../helper/timestamp';
import { MailService } from 'src/module/mail/mail.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 0;
  private user = {} as User;
  private initUser: User = {
    authenticationStatus: false,
    email: '',
    id: this.id,
    password: '',
    uesrName: '',
    userId: '',
  };

  constructor(private readonly mailService: MailService) {}

  async regist(createUserDto: CreateUserDto): Promise<number> {
    // 사용자 정보 초기화
    this.user = { ...this.initUser };
    // 사용자 중복 체크
    this.userExistCheck(createUserDto.email);
    // 사용자 정보 저장 (아이디, 생성날짜, 미인증 상태 추가)
    this.user = {
      ...createUserDto,
      id: 0,
      authenticationStatus: false,
    };
    // 가입인증 이메일 발송
    return await this.mailService.sendVerificationMail(
      createUserDto.email,
      uuid.v1(),
    );
  }

  async create(authNumber: number) {
    // 인증번호 확인
    this.mailService.verifyAuthNumber(authNumber);
    // 사용자 정보 저장 (생성 날짜, 인증 상태 추가)
    this.user = {
      ...this.user,
      created_on: getTodayTimestamp(),
      authenticationStatus: true,
    };
    // 사용자 추가
    this.saveUser(this.user);
    // id 증가
    this.id++;
    return this.user;
  }

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

  remove(id: number): User[] {
    if (!this.findOne(id)) {
      throw new BadRequestException('사용자가 존재하지 않습니다.');
    }
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  userExistCheck(email: string) {
    if (this.users.find((user) => user.email === email)) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }
    return;
  }

  saveUser(user: User) {
    this.users.push(user);
    return true;
  }
}
