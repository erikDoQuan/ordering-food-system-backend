import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';

// giả lập decorator CurrentUser (bạn có thể dùng JWT thực tế sau)
const CurrentUser = () => (target: any, key: string | symbol, index: number) => {};

@ApiTags('Orders (User)')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng (User)' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng của mình (User)' })
  findMyOrders(@CurrentUser() user: { id: number }) {
    const userId = user?.id || 1; // giả lập userId
    return this.orderService.findMyOrders(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin đơn hàng của mình theo ID (User)' })
  findOne(@Param('id') id: number, @CurrentUser() user: { id: number }) {
    const userId = user?.id || 1;
    // có thể kiểm tra quyền ở đây
    return this.orderService.findOne(id); // giữ nguyên
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật đơn hàng của mình theo ID (User)' })
  update(
    @Param('id') id: number,
    @Body() dto: CreateOrderDto,
    @CurrentUser() user: { id: number },
  ) {
    // có thể kiểm tra quyền
    return this.orderService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá đơn hàng của mình theo ID (User)' })
  remove(@Param('id') id: number, @CurrentUser() user: { id: number }) {
    const userId = user?.id || 1;
    return this.orderService.removeMyOrder(id, userId);
  }
}
