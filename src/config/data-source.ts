import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Dish } from '../entities/dish.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { Review } from '../entities/review.entity';

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
