import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MidtransService } from './midtrans/midtrans.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post()
  async create() {
    return this.midtransService.Pay();
  }

}
