import { EnumUserRole } from '../entities/user.role.entity';

export class ResponseUserDto {
  role: EnumUserRole;
  userId: string;
  uesrName: string;
  email: string;
}
