import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.schema';
import {
  CreateTransactionDto,
  FilterTransactionDto,
  UpdateTransactionDto,
} from './dto/transaction.dto';
import { AppGateway } from '../app.gateway';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private model: Model<Transaction>,
    private readonly gateway: AppGateway,
  ) {}

  async create(userId: any, dto: CreateTransactionDto) {
    const transaction = await this.model.create({ user: userId, ...dto, date:dto.date|| Date() });
    this.gateway.notifyTransactionUpdate(`transaction with id of ${transaction.id} was created`);
    return transaction      .populate('user')
    ;
  }

  async findAll(filterDto: FilterTransactionDto) {
    const page = Number(filterDto.page) || 1;
    const limit = Number(filterDto.limit) || 10;
    const skip = (page - 1) * limit;

    // Separate pagination and search from filters
    const { page: _page, limit: _limit, search, ...filters } = filterDto;

    // if (search) {
    //   const searchRegex = new RegExp(search, 'i');
    //   filters['$or'] = [
    //     // Adjust the field names as necessary.
    //     { user: { $regex: searchRegex } },
    //     // You could add additional fields, e.g., { description: { $regex: searchRegex } },
    //   ];
    // }

    // Get total count for pagination
    const total = await this.model.countDocuments(filters);

    // Retrieve filtered, paginated transactions and populate the user field
    const transactions = await this.model
      .find(filters)
      .populate('user')
      .skip(skip)
      .limit(limit).sort([["date", "desc"]]);

    return { data: transactions, total, page, limit };
  }

  async findById(id: string) {
    return this.model.findById(id).populate('user');
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const transaction = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('user');
    if (!transaction) throw new NotFoundException('Transaction not found');
    this.gateway.notifyTransactionUpdate(`transaction with id of ${id} was updated`);
    return transaction;
  }

  async delete(id: string) {
    const transaction = await this.model.findByIdAndDelete(id);
    this.gateway.notifyTransactionUpdate(`transaction with id of ${id} was deleted`);
    return transaction;
  }
}
