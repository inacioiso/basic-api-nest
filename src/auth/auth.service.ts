import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from '../database/prisma.service';
import { UserResponseDto } from './dto/user-response-dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

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

    async listUsers(): Promise<UserResponseDto[]> {
        const users = await this.prismaService.user.findMany();

        if (users.length === 0) {
            throw new NotFoundException('No users found');
        }

        return users.map((user) => new UserResponseDto(user));
    }
}
