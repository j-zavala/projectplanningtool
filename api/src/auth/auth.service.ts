import { Injectable } from '@nestjs/common';
import { SignupDto } from './auth.controller';

@Injectable()
export class AuthService {
  signup(signupDto: SignupDto) {
    console.log('service.ts - SIGNUP DTO: ', signupDto);
    return signupDto;
  }
}
