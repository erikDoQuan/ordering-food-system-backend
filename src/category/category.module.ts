import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CategoryController } from 'src/category/category.controller';
import { AdminCategoryController } from 'src/category/admin-category.controller';
import { Category } from 'src/category/enitities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController, AdminCategoryController],
})
export class CategoryModule {}
