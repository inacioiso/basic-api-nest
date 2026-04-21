import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResponseDto } from './dto/user-response-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  listID(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
