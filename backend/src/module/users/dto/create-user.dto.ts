import { UserRoleEntity } from '../entities/user.role.entity';

export class CreateUserDto {
  readonly role: UserRoleEntity;
  readonly userId: string;
  readonly uesrName: string;
  readonly email: string;
  readonly password: string;
}
