import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { ReviewService } from 'src/review/review.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin - Reviews')
@Controller('admin/reviews')
export class AdminReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'Admin xem danh sách tất cả review' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Admin xem chi tiết 1 review' })
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Admin cập nhật review (rating, comment, ...)' })
  update(@Param('id') id: number, @Body() dto: CreateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Admin xóa review' })
  remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }
}
