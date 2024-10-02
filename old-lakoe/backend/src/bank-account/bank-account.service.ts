import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BankAccountService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    const thisStore = await this.prismaService.stores.findFirst({
      where: {
        user: {
          id: thisUser.id
        }
      },
      include: {
        bank_accounts: true
      }
    });

    if (thisStore.bank_accounts.length === 3) {
      return 'Denied!';
    }

    return await this.prismaService.bank_accounts.create({
      data: {
        bank: createBankAccountDto.bank,
        acc_number: createBankAccountDto.acc_number,
        acc_name: createBankAccountDto.acc_name,
        store_id: thisStore.id
      }
    });
  }

  async findAll(userId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    const thisStore = await this.prismaService.stores.findFirst({
      where: {
        user: {
          id: thisUser.id
        }
      },
      include: {
        bank_accounts: true
      }
    });

    return thisStore.bank_accounts;
  }

  async update(userId: string, bankId: string, updateBankAccountDto: UpdateBankAccountDto) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    const thisStore = await this.prismaService.stores.findFirst({
      where: {
        user: {
          id: thisUser.id
        }
      }
    });

    return await this.prismaService.bank_accounts.update({
      where: {
        id: bankId,
        store_id: thisStore.id
      },
      data: {
        bank: updateBankAccountDto.bank,
        acc_number: updateBankAccountDto.acc_number,
        acc_name: updateBankAccountDto.acc_name
      }
    });
  }

  async remove(userId: string, bankId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    const thisStore = await this.prismaService.stores.findFirst({
      where: {
        user: {
          id: thisUser.id
        }
      },
      include: {
        bank_accounts: true
      }
    });

    return await this.prismaService.bank_accounts.delete({
      where: {
        id: bankId,
        store_id: thisStore.id
      }
    });
  }
}
