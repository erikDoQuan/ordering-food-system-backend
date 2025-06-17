// src/dto/create-payment.dto.ts

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID của đơn hàng' })
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @ApiProperty({
    example: 'cash',
    description: 'Phương thức thanh toán: cash, card, etc.',
  })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({
    example: 240000,
    description: 'Tổng số tiền thanh toán (VND)',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'paid',
    description: 'Trạng thái thanh toán',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    example: '2025-06-17T08:30:00.000Z',
    description: 'Thời điểm đã thanh toán',
    required: false,
  })
  @IsOptional()
  paid_at?: Date;
}
