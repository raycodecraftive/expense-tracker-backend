import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { MailService } from 'src/services/email/email.service';


@Injectable()
export class AuthService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async login(dto: LoginDTO) {

    try {
      const user  = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if(!user){
        throw new BadRequestException('User not found');
      }

      const isPasswordValid  = await bcrypt.compare(dto.password, user.password);

      if(!isPasswordValid){
        throw new UnauthorizedException('Invalid password');
      }
      const accessToken = await this.jwtService.signAsync({sub: user.id});
      return {access_token : accessToken};

      
    } catch (error) {
      throw error;
    }

  }
  async registerUser(dto: RegisterDTO) {
    try {
      let userExist = await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (userExist) {
        throw new BadRequestException('User already exist');
      }
      // create user
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          name: `${dto.firstName} ${dto.lastName}`,
          password: hashedPassword,
        },
      });
      delete user.password;

      // generate token

      const accessToken = await this.jwtService.signAsync({ sub: user.id,  })
      await this.mailService.sendCustomEmail(
        user.email,
        'Welcome to Expense Tracker',
        'Thank you for registering with us.',
        []
      )
      return {
        access_token: accessToken,
      };

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
