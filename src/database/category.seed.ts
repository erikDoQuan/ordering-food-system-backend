import { DataSource } from 'typeorm';
import { Category } from '../category/enitities/category.entity';

export async function seedCategories(dataSource: DataSource) {
  const repo = dataSource.getRepository(Category);

  const categories = [
    { name: 'Pizza', description: 'Các loại pizza truyền thống Ý' },
    { name: 'Mì Ý', description: 'Spaghetti và pasta phong cách Ý' },
    { name: 'Thức uống', description: 'Nước ngọt, nước trái cây và nước suối' },
  ];

  for (const data of categories) {
    const existing = await repo.findOneBy({ name: data.name });
    if (!existing) {
      const category = repo.create(data);
      await repo.save(category);
      console.log(`✅ Đã tạo category: ${data.name}`);
    }
  }
}
