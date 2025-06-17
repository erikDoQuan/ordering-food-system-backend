import { DataSource } from 'typeorm';
import { Review } from '../entities/review.entity';
import { User } from '../entities/user.entity';
import { Dish } from '../entities/dish.entity';

export async function seedReviews(dataSource: DataSource) {
  const repo = dataSource.getRepository(Review);
  const userRepo = dataSource.getRepository(User);
  const dishRepo = dataSource.getRepository(Dish);

  const user = await userRepo.findOneBy({ email: 'nam@example.com' });
  const dish = await dishRepo.findOneBy({ name: 'Pizza Hải Sản' });

  if (user && dish) {
    const review = repo.create({
      user,
      dish,
      rating: 5,
      comment: 'Rất ngon và vừa miệng!',
    });
    await repo.save(review);
    console.log(`Đã tạo review của ${user.email} cho món ${dish.name}`);
  }
}
