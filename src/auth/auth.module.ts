import { Module } from '@nestjs/common';
import { UserAuthModule } from './user-auth/user-auth.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
  imports: [UserAuthModule, AdminAuthModule],
})
export class AuthModule {}
