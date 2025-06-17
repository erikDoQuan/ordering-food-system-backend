import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user.module';
import { CategoryModule } from './modules/category.module';
import { DishModule } from './modules/dish.module';
import { OrderModule } from './modules/order.module';
import { PaymentModule } from './modules/payment.module';
import { ReviewModule } from './modules/review.module';
import { AuthModule } from './modules/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
