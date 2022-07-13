import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  role: UserRole;
  userId: string;
  uesrName: string;
  email: string;
  password: string;
}
