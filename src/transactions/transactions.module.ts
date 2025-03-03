import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { Transaction, TransactionSchema } from './transaction.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AppGateway } from '../app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, JwtAuthGuard, AppGateway],
  exports: [TransactionService],
})
export class TransactionsModule {}
