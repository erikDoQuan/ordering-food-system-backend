import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách người dùng',
    description: 'Trả về toàn bộ danh sách người dùng hiện có trong hệ thống.',
  })
  @ApiResponse({
    status: 200,
    description: 'Danh sách người dùng',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin người dùng theo ID',
    description: 'Truy xuất chi tiết thông tin người dùng dựa trên ID.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID của người dùng' })
  @ApiResponse({ status: 200, description: 'Thông tin người dùng', type: User })
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Tạo người dùng mới',
    description: 'Thêm mới một người dùng vào hệ thống.',
  })
  @ApiResponse({
    status: 201,
    description: 'Người dùng đã được tạo',
    type: User,
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật một phần thông tin người dùng',
    description:
      'Chỉnh sửa thông tin người dùng như tên, email, số điện thoại,...',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của người dùng cần cập nhật',
  })
  @ApiResponse({
    status: 200,
    description: 'Người dùng đã được cập nhật',
    type: User,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | null> {
    await this.userService.update(id, dto);
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa người dùng theo ID',
    description: 'Xóa người dùng khỏi hệ thống bằng cách cung cấp ID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của người dùng cần xóa',
  })
  @ApiResponse({ status: 200, description: 'Người dùng đã được xóa' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
