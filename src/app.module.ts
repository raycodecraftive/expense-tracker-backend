import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { ExpenseModule } from './modules/expense/expense.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ExpenseModule, AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),

  ],
  controllers: [AppController],
  providers: [AppService, PrismaService,


  ],
})
export class AppModule {}
