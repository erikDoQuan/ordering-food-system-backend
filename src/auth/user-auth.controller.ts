import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '.././user/dto/create-user.dto';
import { UserService } from '.././user/user.service';
import { UserRole } from '.././user/constant/user-role.constant';
import { User } from '.././user/enitities/user.entity';

@ApiTags('User Auth')
@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: 'User Register',
    description: 'Đăng ký tài khoản người dùng',
  })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công', type: User })
  async register(@Body() dto: CreateUserDto): Promise<User> {
    dto.role = UserRole.USER;
    return this.userService.create(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Đăng nhập tài khoản người dùng',
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

    if (user.role !== UserRole.USER) {
      throw new UnauthorizedException('Tài khoản không hợp lệ');
    }

    return user;
  }

  @Post('logout')
  @ApiOperation({
    summary: 'User Logout',
    description: 'Đăng xuất tài khoản người dùng',
  })
  @ApiResponse({ status: 200, description: 'Đăng xuất thành công' })
  async logout(): Promise<{ message: string }> {
    return { message: 'Đăng xuất thành công (User)' };
  }
}
