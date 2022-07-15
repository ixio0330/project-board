import { EnumUserRole } from './user.role.entity';

export class User {
  id: number;
  userId: string;
  uesrName: string;
  email: string;
  password: string;
  role: EnumUserRole;
  salt: string;
  created_on?: string;
  updated_on?: string;
}
