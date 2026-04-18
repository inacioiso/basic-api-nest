import { User } from '../../generated/prisma/client';
import { Role } from '../../generated/prisma/enums';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
  }
}
