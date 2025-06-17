import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DishService } from 'src/dish/dish.service';
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Dish } from 'src/dish/entities/dish.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('Admin Dishes')
@Controller('admin/dishes')
export class AdminDishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  @ApiOperation({ summary: 'Admin - Tạo món ăn mới' })
  @ApiResponse({ status: 201, description: 'Món ăn đã được tạo', type: Dish })
  create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Admin - Lấy danh sách tất cả món ăn' })
  @ApiResponse({ status: 200, description: 'Danh sách món ăn', type: [Dish] })
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Admin - Lấy thông tin món ăn theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Thông tin món ăn', type: Dish })
  findOne(@Param('id') id: number) {
    return this.dishService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Admin - Chỉnh sửa món ăn theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Món ăn đã được chỉnh sửa',
    type: Dish,
  })
  update(@Param('id') id: number, @Body() dto: CreateDishDto) {
    return this.dishService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Admin - Xóa món ăn theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Món ăn đã được xóa' })
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.dishService.remove(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Admin - Bật/tắt món ăn (publish)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật trạng thái publish',
    type: Dish,
  })
  togglePublish(@Param('id') id: number, @Body() body: { is_active: boolean }) {
    return this.dishService.togglePublish(id, body.is_active);
  }
}
