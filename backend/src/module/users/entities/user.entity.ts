import { EnumUserRole } from './user.role.entity';

export class User {
  id: string;
  nickname: string;
  email: string;
  password: string;
  role: EnumUserRole;
  salt: string;
  created_on: string;
}
