import { DataSource } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { Order } from '../entities/order.entity';

export async function seedPayments(dataSource: DataSource) {
  const repo = dataSource.getRepository(Payment);
  const orderRepo = dataSource.getRepository(Order);

  // Thêm điều kiện where để tránh lỗi
  const order = await orderRepo.findOne({
    where: {},
    relations: ['user'],
  });

  if (order) {
    const payment = repo.create({
      order,
      payment_method: 'cash',
      paid_at: new Date(),
      amount: order.total_amount,
      status: 'paid',
    });
    await repo.save(payment);
    console.log(`Đã tạo payment cho đơn hàng của ${order.user.email}`);
  }
}
