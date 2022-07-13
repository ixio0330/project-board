import { UserRoleEntity } from './user.role.entity';

export class User {
  id: number;
  role: UserRoleEntity;
  authenticationStatus: boolean;
  userId: string;
  uesrName: string;
  email: string;
  password: string;
  created_on?: string;
  updated_on?: string;
}
