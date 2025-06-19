import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/enitities/category.entity';
import { Dish } from '../dish/entities/dish.entity';
import { Order } from '../order/entities/order.entity';
import { Payment } from '../payment/entities/payment.entity';
import { Review } from '../review/entities/review.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'food_ordering_user',
  password: 'food_ordering_pass',
  database: 'food_ordering_system_local',
  entities: [User, Category, Dish, Order, Payment, Review],
  synchronize: true,
});
