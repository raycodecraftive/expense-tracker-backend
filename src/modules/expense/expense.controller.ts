import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Prisma } from '@prisma/client';
import { CreateExpenseDTO } from './dto/createexpense.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    // Create a new expense
    @Post()
    async create(@Body() data:CreateExpenseDTO) {
        return this.expenseService.createExpense(data);
    }

    // Get all expenses
    @Get()
    async findAll(@Req() req: any) {
        console.log(req.user);
        return this.expenseService.getAllExpenses(req.user);
    }

    /// Get a Single expense by ID
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.expenseService.getExpenseById(id);
    }

    /// update an expense
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data:CreateExpenseDTO,
    ) {
        return this.expenseService.updateExpense(+id,data);
    }

    /// Delete an expense  
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.expenseService.deleteExpense(+id);
    }
}
