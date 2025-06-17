// src/dish/dish.controller.ts

import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { DishService } from 'src/dish/dish.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Dish } from 'src/dish/entities/dish.entity';

@ApiTags('Dishes (User)')
@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách món ăn (user)' })
  @ApiResponse({ status: 200, description: 'Danh sách món ăn', type: [Dish] })
  findAll(): Promise<Dish[]> {
    return this.dishService.findAllPublished(); // lấy danh sách món active
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết món ăn (user)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chi tiết món ăn', type: Dish })
  findOne(@Param('id') id: number): Promise<Dish | null> {
    return this.dishService.findPublishedById(id); // lấy món active
  }
}
