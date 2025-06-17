import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

export async function seedUsers(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);

  const users = [
    {
      first_name: 'Quân',
      last_name: 'Minh',
      email: 'admin@example.com',
      password: '123456',
      phone: '0900000000',
      address_line: '123 Đường A, Quận B',
    },
    {
      first_name: 'Tuấn',
      last_name: 'Nguyễn',
      email: 'tuan@example.com',
      password: '123456',
      phone: '0901111222',
      address_line: '456 Đường C, Quận D',
    },
    {
      first_name: 'Nam',
      last_name: 'Trần',
      email: 'nam@example.com',
      password: '123456',
      phone: '0903333444',
      address_line: '789 Đường E, Quận F',
    },
  ];

  for (const userData of users) {
    const existing = await userRepo.findOneBy({ email: userData.email });
    if (!existing) {
      const user = userRepo.create(userData);
      await userRepo.save(user);
      console.log(` Đã tạo user: ${user.email}`);
    } else {
      console.log(` User với email ${userData.email} đã tồn tại, bỏ qua`);
    }
  }
}
