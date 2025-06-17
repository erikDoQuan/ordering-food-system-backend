import { DataSource } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/enitities/user.entity';

export async function seedOrders(dataSource: DataSource) {
  const repo = dataSource.getRepository(Order);
  const userRepo = dataSource.getRepository(User);

  const user = await userRepo.findOneBy({ email: 'tuan@example.com' });

  if (!user) {
    console.error(' User with email tuan@example.com not found.');
    return;
  }

  const orders = [
    {
      user,
      order_items: [
        { name: 'Pizza Hải Sản', quantity: 1, price: 200000 },
        { name: 'Coca-Cola', quantity: 2, price: 40000 },
      ],
      total_amount: 240000,
      status: 'pending',
    },
  ];

  for (const orderData of orders) {
    const order = repo.create(orderData);
    await repo.save(order);
    console.log(` Đã tạo đơn hàng cho ${user.email}`);
  }
}
