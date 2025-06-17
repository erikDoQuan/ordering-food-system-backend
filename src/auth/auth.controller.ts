// import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
// import { LoginDto } from './dto/login.dto';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import { UserService } from '../user/user.service';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { User } from '../user/enitities/user.entity';

// @ApiTags('Auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly userService: UserService) {}

//   @Post('login')
//   @ApiOperation({ summary: 'Đăng nhập người dùng' })
//   @ApiResponse({ status: 200, description: 'Đăng nhập thành công', type: User })
//   async login(@Body() loginDto: LoginDto): Promise<User> {
//     const user = await this.userService.findByEmail(loginDto.email);
//     if (!user || user.password !== loginDto.password) {
//       throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
//     }
//     return user;
//   }

//   @Post('register')
//   @ApiOperation({ summary: 'Đăng ký người dùng' })
//   @ApiResponse({ status: 201, description: 'Đăng ký thành công', type: User })
//   async register(@Body() createUserDto: CreateUserDto): Promise<User> {
//     return this.userService.create(createUserDto);
//   }

//   @Post('logout')
//   @ApiOperation({ summary: 'Đăng xuất người dùng' })
//   @ApiResponse({ status: 200, description: 'Đăng xuất thành công' })
//   async logout(): Promise<{ message: string }> {
//     // Nếu dùng JWT thì có thể xóa refresh token ở đây
//     return { message: 'Đăng xuất thành công' };
//   }
// }
