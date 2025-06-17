import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserService } from '.././user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/enitities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserAuthController],
  providers: [UserService],
})
export class UserAuthModule {}
