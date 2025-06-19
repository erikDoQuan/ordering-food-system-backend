import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-auth.controller';
import { UserService } from '../../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [UserService],
})
export class AdminAuthModule {}
