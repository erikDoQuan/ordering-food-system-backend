import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ReviewService } from 'src/review/review.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User - Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Người dùng tạo review cho món ăn' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Người dùng xem danh sách review' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Người dùng xem chi tiết 1 review' })
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Người dùng chỉnh sửa review' })
  update(@Param('id') id: number, @Body() dto: CreateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Người dùng xóa review' })
  remove(@Param('id') id: number) {
    return this.reviewService.remove(id);
  }
}
