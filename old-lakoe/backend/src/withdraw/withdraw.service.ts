import { Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WithdrawService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(userId: string, createWithdrawDto: CreateWithdrawDto, bankId: string) {
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

    if (!thisStore) {
      return 'Denied!';
    }

    const thisBank = await this.prismaService.bank_accounts.findFirst({
      where: {
        id: bankId,
        store: {
          id: thisStore.id,
          user: {
            id: thisUser.id
          }
        }
      }
    });

    console.log(bankId);

    console.log(thisBank);


    return await this.prismaService.withdraw.create({
      data: {
        nominal: createWithdrawDto.nominal,
        bank: thisBank.bank,
        rekening: thisBank.acc_number,
        name: thisBank.acc_name,
        user_id: thisUser.id
      }
    });
  }

  async findAll(userId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    return await this.prismaService.withdraw.findMany({
      where: {
        user_id: thisUser.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findAllAdmin(userId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (thisUser.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.withdraw.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async process(userId: string, withdrawId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (thisUser.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.withdraw.update({
      where: {
        id: withdrawId
      },
      data: {
        status: 'Diproses'
      }
    });
  }

  async reject(userId: string, withdrawId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (thisUser.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.withdraw.update({
      where: {
        id: withdrawId
      },
      data: {
        status: 'Ditolak'
      }
    });
  }

  async done(userId: string, withdrawId: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (thisUser.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.withdraw.update({
      where: {
        id: withdrawId
      },
      data: {
        status: 'Selesai'
      }
    });
  }
}
