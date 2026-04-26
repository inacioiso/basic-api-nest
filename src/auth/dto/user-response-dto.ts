import { User } from '../../generated/prisma/client';
import { Role } from '../../generated/prisma/enums';

export class UserResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: Role;
  readonly createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
  }
}
