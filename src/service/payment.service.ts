import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from 'src/dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private repo: Repository<Payment>,
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.repo.create(dto);
    return this.repo.save(payment);
  }

  findAll() {
    return this.repo.find({ relations: ['order'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['order'] });
  }

  async update(id: number, dto: CreatePaymentDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
