import { UserRoleEntity } from '../entities/user.role.entity';

export class ResponseUserDto {
  role: UserRoleEntity;
  userId: string;
  uesrName: string;
  email: string;
}
