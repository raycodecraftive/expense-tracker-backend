import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //http://localhost:3000/auth/register
  @Post("register")
  create(@Body() dto: RegisterDTO) {
    return this.authService.registerUser(dto);
  }

  //http://localhost:3000/auth/login
  @Post("login")
  login (@Body() dto: LoginDTO,
  
) {
    return this.authService.login(dto);
  }

}
