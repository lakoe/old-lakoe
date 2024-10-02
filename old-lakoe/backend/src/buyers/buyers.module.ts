import { Module } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BuyersController],
  providers: [BuyersService, PrismaService],
})
export class BuyersModule { }
