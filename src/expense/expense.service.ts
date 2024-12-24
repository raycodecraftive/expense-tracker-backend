import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateExpenseDTO } from './dto/createexpense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  // Create a new expense
  async createExpense(data: CreateExpenseDTO) {
    const {description,price,category} = data
    return this.prisma.expense.create({

      data : {
          description,
        amount : price,
        category 

        /// destructuring object
      },
    });
  }

  // Get a single expense by ID
  async getExpenseById(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
    });
  }

  // Update an expense
  async updateExpense(id: number, data: Prisma.ExpenseUpdateInput) {
    return this.prisma.expense.update({
      where: { id },
      data,
    });
  }

  // Delete an expense
  async deleteExpense(id: number) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }

  // Get all expenses
  async getAllExpenses() {
    return this.prisma.expense.findMany();
  }
}
