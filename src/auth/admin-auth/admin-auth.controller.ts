import { Controller, Get, Patch, Param, Body, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

@ApiTags('Admin Users')
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách user',
    description: 'Lấy toàn bộ user (kể cả active/inactive)',
  })
  @ApiResponse({ status: 200, description: 'Danh sách user', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin user',
    description: 'Lấy thông tin chi tiết của 1 user',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Thông tin user', type: User })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật user',
    description: 'Admin cập nhật thông tin user',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'User đã được cập nhật',
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
    summary: 'Xoá mềm user',
    description: 'Đánh dấu user là không active (xoá mềm)',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User đã bị xoá (mềm)' })
  async softDelete(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.softDelete(id);
    return { message: 'User đã bị xoá (mềm)' };
  }
}
