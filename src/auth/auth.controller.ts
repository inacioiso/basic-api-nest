import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResponseDto } from './dto/user-response-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.authService.createUser(createUserDto);
    }

    @Get('users')
    listUsers(): Promise<UserResponseDto[]> {
        return this.authService.listUsers();
    }   
}
