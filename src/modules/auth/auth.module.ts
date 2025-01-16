import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { MailService } from 'src/services/email/email.service';


@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService,MailService],
})
export class AuthModule {}
