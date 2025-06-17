import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { UserService } from '../../user/user.service';
import { UserRole } from '../../user/constant/user-role.constant';
import { User } from '../../user/enitities/user.entity';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Admin login',
    description: 'Đăng nhập tài khoản quản trị viên',
  })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công', type: User })
  async login(@Body() loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    if (user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Bạn không có quyền Admin');
    }

    // Có thể return thêm token JWT nếu bạn dùng JWT
    return user;
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Admin logout',
    description: 'Đăng xuất tài khoản quản trị viên',
  })
  @ApiResponse({ status: 200, description: 'Đăng xuất thành công' })
  async logout(): Promise<{ message: string }> {
    // Nếu  có dùng JWT hoặc session thì có thể clear ở đây
    return { message: 'Đăng xuất thành công (Admin)' };
  }
}
