import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'food_ordering_user',
      password: 'food_ordering_pass',
      database: 'food_ordering_system_local',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    DishModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    AuthModule, // Không cần phải import riêng UserAuthModule hay AdminAuthModule nữa
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
