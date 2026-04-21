import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResponseDto } from './dto/user-response-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
      },
    });

    return new UserResponseDto(user);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
