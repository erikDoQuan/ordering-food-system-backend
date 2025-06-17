import { AppDataSource } from '../config/data-source';
import { seedUsers } from '../database/user.seed'
import { seedCategories } from './category.seed';
import { seedDishes } from './dish.seed';
import { seedOrders } from './order.seed';
import { seedPayments } from './payment.seed';
import { seedReviews } from './review.seed';

AppDataSource.initialize()
  .then(async () => {
    console.log(' Bắt đầu seed dữ liệu...');
    await seedUsers(AppDataSource);
    await seedCategories(AppDataSource);
    await seedDishes(AppDataSource);
    await seedOrders(AppDataSource);
    await seedPayments(AppDataSource);
    await seedReviews(AppDataSource);
    console.log(' Đã seed xong dữ liệu mẫu!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(' Lỗi khi seed dữ liệu:', err);
    process.exit(1);
  });
