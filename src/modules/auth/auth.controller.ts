import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //http://localhost:3000/auth/register
  @Post("register")
  create(@Body() dto: RegisterDTO) {
    return this.authService.registerUser(dto);
  }

}
