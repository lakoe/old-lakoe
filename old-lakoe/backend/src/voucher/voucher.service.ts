import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VoucherService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async create(userId: string, createVoucherDto: CreateVoucherDto) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (thisUser.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.voucher.create({
      data: {
        nominal: createVoucherDto.nominal,
        code: createVoucherDto.code
      }
    });
  }

  async findAll() {
    return await this.prismaService.voucher.findMany();
  }

  async remove(userId: string, voucherId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (thisUser.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.voucher.delete({
      where: {
        id: voucherId
      }
    });
  }
}
