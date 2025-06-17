// src/dish/dish.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from 'src/dish/entities/dish.entity';
import { DishController } from 'src/dish/dish.controller';
import { AdminDishController } from 'src/dish/admin-dish.controller'; // <-- Thêm dòng này
import { DishService } from 'src/dish/dish.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  controllers: [DishController, AdminDishController], // <-- Thêm AdminDishController vào đây
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {}
