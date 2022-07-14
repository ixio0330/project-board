import { UserRoleEntity } from './user.role.entity';

export class User {
  id: number;
  userId: string;
  uesrName: string;
  email: string;
  password: string;
  role: UserRoleEntity;
  salt: string;
  created_on?: string;
  updated_on?: string;
}
