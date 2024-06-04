import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export type SignupDto = {
    name: string;
    email: string;
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    signup(@Body() signupDto: SignupDto) {
        console.log("controller.ts - SIGNUP DTO: ", signupDto);
        return this.authService.signup(signupDto);
    }
}
