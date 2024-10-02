import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly prismaService: PrismaService) {}

  // create(createInvoiceDto: CreateInvoiceDto) {
  //   return this.prismaService.invoices.create({
  //     data: createInvoiceDto
  //   })
  // }

  async findAll() {
    return this.prismaService.invoices.findMany();
  }

  findOne(id: string) {
    return this.prismaService.invoices.findFirst({
      where: { id },
    });
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: string) {
    return this.prismaService.invoices.delete({
      where: { id },
    });
  }
}
