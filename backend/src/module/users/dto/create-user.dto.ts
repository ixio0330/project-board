import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumUserRole } from '../entities/user.role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly nickname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsEnum(EnumUserRole)
  readonly role: EnumUserRole;
}
