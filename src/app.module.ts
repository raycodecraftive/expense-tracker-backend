import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { ExpenseModule } from './modules/expense/expense.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ExpenseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
