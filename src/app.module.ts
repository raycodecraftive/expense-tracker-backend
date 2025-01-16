import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { ExpenseModule } from './modules/expense/expense.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProfileModule } from './modules/profile/profile.module';
import { MailService } from './services/email/email.service';


@Module({
  imports: [ExpenseModule, AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    ProfileModule,

  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MailService,


  ],
})
export class AppModule {}
