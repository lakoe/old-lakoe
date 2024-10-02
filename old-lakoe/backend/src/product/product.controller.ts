import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get('all/:user_id')
  async findAll(
    @Param('user_id') user_id: string,
    @Query('searchTerm') searchTerm: string,
    @Query('isActive') isActive: number,
    @Query('category') category: string,
    @Query('action') action: string
  ) {
    console.log("HIT ALL", user_id, searchTerm, 'this', isActive, category, action);
    return await this.productService.findAll(user_id, searchTerm, isActive, category, action);
  }

  @Get('invoice/:id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Get('category')
  async findCategory() {
    return await this.productService.findCategory();
  }

  @Get('items/:id')
  async findItemsOne(@Param('id') id: string) {
    const item = await this.productService.findItem(id);
    return item;
  }

  @Patch(':variantId')
  async updatePrice(@Param('variantId') variantId: string, @Body() newPrice: number) {
    return await this.productService.updatePrice(variantId, newPrice);
  }

  @Patch('stock/:variantId')
  async updateStock(@Param('variantId') variantId: string, @Body() newPrice: number) {
    return await this.productService.updateStock(variantId, newPrice);
  }

  @Patch('activate/a/:productId')
  async activate(@Query('userId') userId: string, @Param('productId') productId: string) {
    return await this.productService.activate(userId, productId);
  }

  @Patch('nonactivate/n/a/:productId')
  async nonactivate(@Query('userId') userId: string, @Param('productId') productId: string) {
    return await this.productService.nonactivate(userId, productId);
  }

  @Delete(':productId')
  async delete(@Query('userId') userId: string, @Param('productId') productId: string) {
    return await this.productService.delete(userId, productId);
  }

  @Delete('variant/:variantId')
  async deleteVariant(@Param('variantId') variantId: string) {
    return await this.productService.deleteVariant(variantId);
  }
}
