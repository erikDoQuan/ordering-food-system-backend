import { Module } from '@nestjs/common';
import { AdminAuthController } from './admin-auth.controller';
import { UserService } from '../../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/enitities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminAuthController],
  providers: [UserService],
})
export class AdminAuthModule {}
