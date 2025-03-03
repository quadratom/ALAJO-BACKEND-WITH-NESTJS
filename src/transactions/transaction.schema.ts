import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/user.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  // @Prop({ type: String })
  // _id: string; // 👈 Explicitly define _id
  
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  // Reference to the User model; using ObjectId for relationships.
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
