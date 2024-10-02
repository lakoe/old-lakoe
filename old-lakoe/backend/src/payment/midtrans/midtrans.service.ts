import { Injectable } from '@nestjs/common';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MidtransService {
  constructor(private readonly prismaService: PrismaService) {}

  async Pay() {
    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-gEHNFjlsuyIXk635L5b-aMl-',
      clientKey: 'SB-Mid-client-dOiwTDQzyW6mHHxL',
    });

    const orderId = await this.prismaService.carts_items.findFirst({});

    const parameter = {
      transaction_details: {
        order_id: '1234',
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    console.log(transaction.token);

    return transaction.token;
  }
}
