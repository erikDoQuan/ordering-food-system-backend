import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserService } from '../../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from '../../refresh-token/refresh-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'SECRET_KEY', // Bạn nên đưa vào .env
      signOptions: { expiresIn: '1h' },
    }),
    RefreshTokenModule,
  ],
  controllers: [UserAuthController],
  providers: [UserService],
})
export class UserAuthModule {}
