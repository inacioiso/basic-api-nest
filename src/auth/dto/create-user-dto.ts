import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../../generated/prisma/enums";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsEnum(Role)
  role!: Role;
}