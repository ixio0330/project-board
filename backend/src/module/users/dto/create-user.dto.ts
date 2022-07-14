import { UserRoleEntity } from '../entities/user.role.entity';

export class CreateUserDto {
  role: UserRoleEntity;
  userId: string;
  uesrName: string;
  email: string;
  password: string;
}
