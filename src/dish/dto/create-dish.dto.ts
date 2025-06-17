import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DishStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

export class CreateDishDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  base_price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ enum: DishStatus, default: DishStatus.AVAILABLE })
  @IsEnum(DishStatus)
  status: DishStatus;
}
