import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber,IsMongoId, IsDate, isString, IsOptional, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: '65f0c1d7f1e4d53a8d7b7f9d' }) // MongoDB ObjectId example
  @IsMongoId()
  _id: string; // 👈 ID field added
  
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDate()
  date: Date;
}

export class UpdateTransactionDto {
  @ApiProperty({ example: '65f0c1d7f1e4d53a8d7b7f9d' }) // MongoDB ObjectId example
  @IsMongoId()
  id: string; // 👈 ID field added

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  amount?: number;

  @ApiProperty()
  @IsDate()
  date?: Date;
}



export class FilterTransactionDto {
  @ApiPropertyOptional({ description: 'User ID for filtering' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({ description: 'Transaction amount for filtering' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  amount?: number;

  @ApiPropertyOptional({ description: 'Transaction date for filtering' })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: 'Number of records per page', default: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ description: 'Search keyword for filtering transactions' })
  @IsOptional()
  @IsString()
  search?: string;
}
