import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/user.service';
import { UserRole } from '../../user/constant/user-role.constant';
import { User } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { RefreshTokenDto } from '../../refresh-token/dto/refresh-token.dto';

@ApiTags('User Auth')
@Controller('user/auth')
export class UserAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Đăng ký tài khoản',
    description: 'Người dùng đăng ký tài khoản mới',
  })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công', type: User })
  async register(@Body() dto: CreateUserDto): Promise<User> {
    dto.role = UserRole.USER;
    return this.userService.create(dto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập tài khoản',
    description: 'Người dùng đăng nhập hệ thống',
  })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công',
    type: User,
  })
  async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
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
    // Tạo Access Token
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshTokenStr = `${user.id}.${Date.now()}.${Math.random()}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 ngày

    await this.refreshTokenService.create(
      {
        userId: user.id,
        token: refreshTokenStr,
        createdByIp: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || '',
        expiresAt,
      },
      user,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshTokenStr,
      user,
    };
  }

  @Post('refresh-token')
  @ApiOperation({
    summary: 'Làm mới Access Token',
    description: 'Dùng refresh token để lấy Access Token mới',
  })
  async refreshToken(
    @Body() dto: RefreshTokenDto,
    @Request() req,
  ): Promise<any> {
    const existingToken = await this.refreshTokenService.findByToken(
      dto.refresh_token,
    );

    if (
      !existingToken ||
      existingToken.revokedAt ||
      existingToken.expiresAt < new Date()
    ) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    const user = existingToken.user;

    const newAccessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: newAccessToken,
    };
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Đăng xuất tài khoản',
    description: 'Người dùng đăng xuất tài khoản khỏi hệ thống',
  })
  @ApiResponse({ status: 200, description: 'Đăng xuất thành công' })
  async logout(): Promise<{ message: string }> {
    return { message: 'Đăng xuất thành công (User)' };
  }
}
