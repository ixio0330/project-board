import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getTodayTimestamp } from '../helper/timestamp';
import { MailService } from 'src/mail/mail.service';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 0;

  constructor(private readonly mailService: MailService) {}

  create(createUserDto: CreateUserDto): User {
    if (this.isUserExist(createUserDto.email)) {
      throw new Error('이미 존재하는 사용자 입니다.');
    }

    const user: User = {
      ...createUserDto,
      id: this.id,
      created_on: getTodayTimestamp(),
    };

    this.saveUser(user);

    const singupToken = uuid.v1();

    return user;
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
    return this.users.filter((user) => user.id !== id);
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  isUserExist(email: string) {
    return this.users.find((user) => user.email === email) ? true : false;
  }

  saveUser(user: User) {
    this.users.push(user);
    return true;
  }
}
