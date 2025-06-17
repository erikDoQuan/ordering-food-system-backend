import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Category } from './enitities/category.entity';

@ApiTags('Admin Categories')
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo danh mục (Admin)' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: Category })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách danh mục (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách danh mục',
    type: [Category],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin danh mục theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Thông tin danh mục',
    type: Category,
  })
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: Category,
  })
  update(@Param('id') id: number, @Body() dto: CreateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa danh mục theo ID (Admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Admin - Bật/tắt danh mục (publish)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật trạng thái publish',
    type: Category,
  })
  togglePublish(@Param('id') id: number, @Body() body: { is_active: boolean }) {
    return this.categoryService.togglePublish(id, body.is_active);
  }
}
