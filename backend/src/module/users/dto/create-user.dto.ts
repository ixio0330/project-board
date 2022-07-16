import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumUserRole } from '../entities/user.role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly uesrName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsEnum(EnumUserRole)
  readonly role: EnumUserRole;
}
