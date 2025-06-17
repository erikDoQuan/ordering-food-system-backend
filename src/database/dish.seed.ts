import { DataSource } from 'typeorm';
import { Dish } from '../entities/dish.entity';
import { Category } from '../entities/category.entity';

export async function seedDishes(dataSource: DataSource) {
  const repo = dataSource.getRepository(Dish);
  const categoryRepo = dataSource.getRepository(Category);

  const pizza = await categoryRepo.findOneBy({ name: 'Pizza' });
  const spaghetti = await categoryRepo.findOneBy({ name: 'Mì Ý' });
  const drink = await categoryRepo.findOneBy({ name: 'Thức uống' });

  if (!pizza || !spaghetti || !drink) {
    console.error(' Không tìm thấy category');
    return;
  }

  const dishes = [
    {
      name: 'Pizza Hải Sản',
      description: 'Pizza hải sản thập cẩm',
      base_price: 200000,
      image_url: 'https://example.com/pizza1.jpg',
      status: 'available' as 'available',
      category: pizza,
      type_name: 'Mỏng',
      size: 'medium' as 'medium',
    },
    {
      name: 'Spaghetti Bò Bằm',
      description: 'Mì Ý với sốt bò bằm',
      base_price: 120000,
      image_url: 'https://example.com/spaghetti.jpg',
      status: 'available' as 'available',
      category: spaghetti,
      type_name: undefined,
      size: undefined,
    },
    {
      name: 'Coca-Cola',
      description: 'Lon 330ml',
      base_price: 20000,
      image_url: 'https://example.com/coke.jpg',
      status: 'available' as 'available',
      category: drink,
      type_name: undefined,
      size: 'small' as 'small',
    },
  ];

  for (const dishData of dishes) {
    const existing = await repo.findOneBy({ name: dishData.name });
    if (!existing) {
      const dish = repo.create(dishData);
      await repo.save(dish);
      console.log(` Đã tạo dish: ${dish.name}`);
    }
  }
}
