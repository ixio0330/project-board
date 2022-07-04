import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getTodayTimestamp } from '../helper/timestamp';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 0;

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      id: this.id,
      created_on: getTodayTimestamp(),
    };
    this.users.push(user);
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
}
