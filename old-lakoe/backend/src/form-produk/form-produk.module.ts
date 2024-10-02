import { Module } from '@nestjs/common';
import { FormProdukService } from './form-produk.service';
import { FormProdukController } from './form-produk.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FormProdukController],
  providers: [PrismaService,FormProdukService],
})
export class FormProdukModule {}
