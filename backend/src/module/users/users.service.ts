import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getTodayTimestamp } from '../../helper/timestamp';
import { MailService } from 'src/module/mail/mail.service';
import * as uuid from 'uuid';
import { UserRoleEntity } from './entities/user.role.entity';

/**
 * TODO 사용자 비밀번호 암호화
 * TODO 로그인 로직 구현
 * TODO 세션? 토큰? -> 정해야 함
 * TODO 사용자 탈퇴 (비밀번호 확인)
 * TODO 사용자 아이디 찾기 (이메일)
 * TODO 사용자 비밀번호 찾기 (이메일)
 */

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 0;
  private user = {} as User;
  private initUser: User = {
    authenticationStatus: false,
    email: '',
    id: this.id,
    role: UserRoleEntity.user,
    password: '',
    uesrName: '',
    userId: '',
  };

  constructor(private readonly mailService: MailService) {}

  // 가입
  async regist(createUserDto: CreateUserDto): Promise<number> {
    // 사용자 정보 초기화
    this.user = { ...this.initUser };
    // 사용자 중복 체크
    this.userExistCheck(createUserDto.email);
    // 관리자일 경우 체크
    if (createUserDto.role === 'admin') {
      this.adminExistCheck();
    }
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

  // 생성
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
  adminExistCheck() {
    if (this.users.find((user) => user.role === UserRoleEntity.admin)) {
      throw new BadRequestException('이미 관리자가 존재합니다.');
    }
    return;
  }

  // 중복 체크
  userExistCheck(email: string) {
    if (this.users.find((user) => user.email === email)) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }
  }

  // 추가
  saveUser(user: User) {
    this.users.push(user);
  }
}
