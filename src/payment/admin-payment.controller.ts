import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';

@ApiTags('Admin Payments')
@Controller('admin/payments')
export class AdminPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thanh toán (Admin)' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Payment })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

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
  @ApiResponse({ status: 200, description: 'Thông tin thanh toán', type: Payment })
  findOne(@Param('id') id: number) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thanh toán theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: Payment })
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