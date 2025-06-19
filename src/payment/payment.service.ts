import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  // ADMIN APIs

  findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({
      where: { is_active: true },
      relations: ['order'],
    });
  }

  findOne(id: number): Promise<Payment | null> {
    return this.paymentRepo.findOne({
      where: { id, is_active: true },
      relations: ['order'],
    });
  }

  create(dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepo.create(dto);
    return this.paymentRepo.save(payment);
  }

  async update(id: number, dto: CreatePaymentDto): Promise<Payment | null> {
    const payment = await this.findOne(id);
    if (!payment) return null;

    Object.assign(payment, dto);
    return this.paymentRepo.save(payment);
  }

  async remove(id: number): Promise<boolean> {
    const payment = await this.findOne(id);
    if (!payment) return false;

    payment.is_active = false;
    await this.paymentRepo.save(payment);
    return true;
  }

  // USER APIs

  findByUser(userId: number): Promise<Payment[]> {
    return this.paymentRepo.find({
      where: { user_id: userId, is_active: true },
      relations: ['order'],
    });
  }

  findOneByUser(userId: number, id: number): Promise<Payment | null> {
    return this.paymentRepo.findOne({
      where: { user_id: userId, id, is_active: true },
      relations: ['order'],
    });
  }
}
