import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/enitities/user.entity';
import { AdminAuthController } from './admin-auth/admin-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminAuthController],
  providers: [UserService],
})
export class AuthModule {}
