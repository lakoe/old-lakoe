import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MidtransModule } from './midtrans/midtrans.module';
import { MidtransService } from './midtrans/midtrans.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, MidtransService, PrismaService],
  imports: [MidtransModule],
})
export class PaymentModule {}
