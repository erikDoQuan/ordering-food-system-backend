import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DishService } from 'src/service/dish.service';
import { CreateDishDto } from 'src/dto/create-dish.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Dish } from 'src/entities/dish.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('Dishes') 
@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo món ăn mới' })
  @ApiResponse({ status: 201, description: 'Món ăn đã được tạo', type: Dish })
  create(@Body() dto: CreateDishDto): Promise<Dish> {
    return this.dishService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả món ăn' })
  @ApiResponse({ status: 200, description: 'Danh sách món ăn', type: [Dish] })
  findAll(): Promise<Dish[]> {
    return this.dishService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin món ăn theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Thông tin món ăn', type: Dish })
  findOne(@Param('id') id: number): Promise<Dish | null> {
    return this.dishService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật món ăn theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Món ăn đã được cập nhật',
    type: Dish,
  })
  update(@Param('id') id: number, @Body() dto: CreateDishDto): Promise<Dish | null> {
    return this.dishService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa món ăn theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Món ăn đã được xóa' })
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.dishService.remove(id);
  }
}
