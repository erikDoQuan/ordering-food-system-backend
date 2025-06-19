import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';

@ApiTags('Admin Payments')
@Controller('admin/payments')
export class AdminPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thanh toán (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách thanh toán',
    type: [Payment],
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thanh toán theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Thông tin thanh toán',
    type: Payment,
  })
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo thanh toán (Admin)' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Payment })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thanh toán theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: Payment,
  })
  update(@Param('id') id: number, @Body() dto: CreatePaymentDto) {
    return this.paymentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa thanh toán theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  remove(@Param('id') id: number) {
    return this.paymentService.remove(id);
  }
}
