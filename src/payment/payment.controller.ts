import {
  Controller,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';

@ApiTags('My Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thanh toán của tôi' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách thanh toán',
    type: [Payment],
  })
  findMyPayments(@Req() req) {
    const userId = req.headers['x-user-id']; // tạm thời lấy userId từ header
    return this.paymentService.findByUser(Number(userId));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thanh toán của tôi' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Thông tin thanh toán',
    type: Payment,
  })
  findMyPayment(@Param('id') id: number, @Req() req) {
    const userId = req.headers['x-user-id'];
    return this.paymentService.findOneByUser(Number(userId), id);
  }
}
