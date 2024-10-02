import { Injectable } from '@nestjs/common';
import { addDiscount, CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(userId: string, name: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    return await this.prismaService.categories.create({
      data: {
        name
      }
    });
  }

  async addDiscount(add : addDiscount) {
    return await this.prismaService.discounts.create({
      data : {
        code : add.code,
        amount : add.amount
      }
    })
  }

  async remove(userId: string, cId: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: userId
      }
    });

    if (user.role_id !== 3) {
      return 'Denied!';
    }

    return await this.prismaService.categories.delete({
      where: {
        id: cId
      }
    });
  }

  async deleteDiscount(discount_id : string) {
    return await this.prismaService.discounts.delete({
      where : {
        id : discount_id
      }
    });
  }

  async deleteCategories(categories_id : string) {
    return await this.prismaService.categories.delete({
      where : {
        id : categories_id
      }
    });
  }

  async fetchAllDiscount() {
    return await this.prismaService.discounts.findMany();
  }


  async findAll() {
    const categori = await this.prismaService.categories.findMany();
    console.log("Hit kategori", categori)
    return categori;
  }
}
