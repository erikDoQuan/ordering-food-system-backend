import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './enitities/user.entity';
import { DeleteResult } from 'typeorm';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Lấy thông tin cá nhân của user đang đăng nhập',
    description: 'API này trả về thông tin của user đang đăng nhập.',
  })
  @ApiResponse({
    status: 200,
    description: 'Thông tin cá nhân của user',
    type: User,
  })
  async getMe(@Request() req): Promise<User | null> {
    // Giả sử có auth middleware gắn userId vào req.user
    const userId = req.user?.id;
    return this.userService.findOne(userId);
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Cập nhật thông tin cá nhân của user',
    description: 'Cập nhật tên, số điện thoại, địa chỉ,...',
  })
  @ApiResponse({
    status: 200,
    description: 'Thông tin cá nhân đã được cập nhật',
    type: User,
  })
  async updateMe(
    @Request() req,
    @Body() dto: UpdateUserDto,
  ): Promise<User | null> {
    const userId = req.user?.id;
    await this.userService.update(userId, dto);
    return this.userService.findOne(userId);
  }

  @Delete('me')
  @ApiOperation({
    summary: 'Xóa user (deactivate tài khoản)',
    description: 'Xóa user (hoặc đánh dấu là không active)',
  })
  @ApiResponse({ status: 200, description: 'User đã bị xóa' })
  async deleteMe(@Request() req): Promise<DeleteResult> {
    const userId = req.user?.id;
    return this.userService.remove(userId);
  }
}
