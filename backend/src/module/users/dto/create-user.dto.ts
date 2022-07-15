import { EnumUserRole } from '../entities/user.role.entity';

export class CreateUserDto {
  readonly role: EnumUserRole;
  readonly userId: string;
  readonly uesrName: string;
  readonly email: string;
  readonly password: string;
}
