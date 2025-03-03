import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:yourpassword@147.93.40.101:27017/admin'), JwtModule.register({
    global: true,
    signOptions: { expiresIn: '60s' },
  }),AuthModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
