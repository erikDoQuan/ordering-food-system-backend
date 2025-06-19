import { Controller, Get, Patch, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // USER xem thông tin của chính mình
  @Get('me')
  @ApiOperation({
    summary: 'Lấy thông tin cá nhân của user đang đăng nhập',
    description: 'API trả về thông tin của user đang đăng nhập',
  })
  @ApiResponse({
    status: 200,
    description: 'Thông tin user',
    type: User,
  })
  async getMe(@Request() req): Promise<User | null> {
    const userId = req.user?.id;
    return this.userService.findOne(userId);
  }

  // USER tự cập nhật thông tin cá nhân
  @Patch('me')
  @ApiOperation({
    summary: 'Cập nhật thông tin cá nhân của user',
  })
  @ApiResponse({
    status: 200,
    description: 'User đã được cập nhật',
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
}
