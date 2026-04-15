import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    getAuthenticated(): string {
        return "authenticated user!";
    }
}
