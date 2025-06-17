import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentController } from 'src/payment/payment.controller';
import { AdminPaymentController } from 'src/payment/admin-payment.controller';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController, AdminPaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
