import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto, FilterTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('transactions')
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiBody({ type: CreateTransactionDto }) // Ensure DTO is referenced
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: any, @Body() dto: CreateTransactionDto) {
    return this.transactionService.create(req.userId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: FilterTransactionDto) {
    return this.transactionService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.transactionService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateTransactionDto }) // Ensure DTO is referenced
  async update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    return this.transactionService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.transactionService.delete(id) ?? {};
  }
}

