import { BadRequestException, Injectable } from '@nestjs/common';

import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
