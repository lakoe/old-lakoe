import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { addDiscount } from './dto/create-category.dto';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post(':userId')
  create(@Param('userId') userId: string, @Body('name') name: string) {
    return this.categoriesService.create(userId, name);
  }

  @Post('discount/create')
  async addDiscount(@Body() add_discount: addDiscount, @Res() res: Response) {
    try {
      console.log(add_discount);
      const addedDiscount = await this.categoriesService.addDiscount(add_discount);
      return res.status(200).json(addedDiscount);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

//   @Get('discount/all')
//   async fetchAllDiscount(@Res() res: Response) {
//     try {
//       const allDiscount = await this.categoriesService.fetchAllDiscount();
//       return res.status(200).json(allDiscount);
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   }

//   @Delete('discount/:id')
//   async deleteDiscount(@Param('id') discount_id: string, @Res() res: Response) {
//     try {
//       const deleteDiscount = await this.categoriesService.deleteDiscount(discount_id);
//       return res.status(200).json(deleteDiscount);
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   }

  @Get('')
  async findAll() {
    return await this.categoriesService.findAll();
  }
// }
// function fetchAllDiscount(arg0: any, res: any, Response: { new(body?: BodyInit | null, init?: ResponseInit): globalThis.Response; prototype: globalThis.Response; error(): globalThis.Response; json(data: any, init?: ResponseInit): globalThis.Response; redirect(url: string | URL, status?: number): globalThis.Response; }) {
//   throw new Error('Function not implemented.');
// }

  @Get('discount/all')
  async fetchAllDiscount(@Res() res : Response) {
    try {
      const allDiscount = await this.categoriesService.fetchAllDiscount()
      return res.status(200).json(allDiscount);
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  @Delete('discount/:id')
  async deleteDiscount(@Param('id') discount_id : string, @Res() res : Response) {
    try {
      const deleteDiscount = await this.categoriesService.deleteDiscount(discount_id)
      return res.status(200).json(deleteDiscount);
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  @Delete(':id')
  async deleteCategories(@Param('id') categories_id : string, @Res() res : Response) {
    try {
      const deleteCategories = await this.categoriesService.deleteCategories(categories_id)
      return res.status(200).json(deleteCategories);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}
