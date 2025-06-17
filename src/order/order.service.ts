import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,
  ) {}

  // Tạo đơn hàng (dùng cho cả admin và user)
  create(dto: CreateOrderDto) {
    const order = this.repo.create(dto);
    return this.repo.save(order);
  }

  // Admin: lấy tất cả đơn hàng
  findAll() {
    return this.repo.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  // User: lấy các đơn hàng của mình
  findMyOrders(userId: number) {
    return this.repo.find({
      relations: ['user'],
      where: { userId: userId },
      order: { created_at: 'DESC' },
    });
  }

  // Tìm 1 đơn hàng bất kỳ (admin hoặc user)
  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  // Cập nhật đơn hàng
  async update(id: number, dto: CreateOrderDto) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  // Admin: xoá bất kỳ đơn hàng nào
  async remove(id: number) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return this.repo.delete(id);
  }

  // User: chỉ được xoá đơn hàng của mình
  async removeMyOrder(id: number, userId: number) {
    const order = await this.repo.findOne({
      where: { id, userId: userId },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng hoặc bạn không có quyền xoá');
    }

    return this.repo.delete(id);
  }
}
