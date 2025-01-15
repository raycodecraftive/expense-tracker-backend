import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateExpenseDTO } from './dto/createexpense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  // Create a new expense
  async createExpense(data: CreateExpenseDTO,  userID : number) {
    const { description, price, category } = data;
    return this.prisma.transaction.create({
      data: {
        description,
        amount: price,
        category,
        userId: userID,
      },
    });
  }

  // Get a single expense by ID
  async getExpenseById(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  // Update an expense
  async updateExpense(id: number, data: CreateExpenseDTO) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        amount: data.price,
        description: data.description,
        category: data.category,
      },
    });
  }

  // Delete an expense
  async deleteExpense(id: number) {
    await this.prisma.transaction.delete({
      where: { id },
    });

    return { message: 'expense deleted' };
  }

  // Get all expenses
  async getAllExpenses(userID : number) {
    return this.prisma.transaction.findMany(
      {
        where : {
          userId: userID
        
      }}
      
      
    );
  }
}
