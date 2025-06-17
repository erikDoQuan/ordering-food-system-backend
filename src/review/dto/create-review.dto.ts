import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 2, description: 'ID của món ăn (Dish)' })
  @IsNotEmpty()
  @IsNumber()
  dish_id: number;

  @ApiProperty({ example: 5, description: 'Đánh giá từ 1 đến 5' })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 'Ngon tuyệt vời!',
    description: 'Nội dung bình luận',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
