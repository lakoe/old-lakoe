import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Response } from 'express';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post(':id/:varianid')
  async create(
    @Param('id') product_id: string,
    @Param('varianid') varian_id: string,
    @Body() createCartItemDto: CreateCartItemDto,
    @Res() res: Response,
  ) {
    try {
      
      const user = res.locals.verifiedUser
      // console.log(createCartItemDto, product_id, user)
      const newCart = await this.cartItemsService.addCarts(createCartItemDto, product_id, user, varian_id);
      return res.status(200).json(newCart);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  @Post('langsung/:id/:varianid')
  async createLangsung(
    @Param('id') product_id: string,
    @Param('varianid') varian_id: string,
    @Body() createCartItemDto: CreateCartItemDto,
    @Res() res: Response,
  ) {
    try {
      
      const user = res.locals.verifiedUser
      // console.log(createCartItemDto, product_id, user)
      const cart_items_id = await this.cartItemsService.addCarts(createCartItemDto, product_id, user, varian_id);
      return res.status(200).json(cart_items_id);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  @Get('all')
  async fetchAllCartItems(@Res() res: Response) {
    try {
      const user = res.locals.verifiedUser;
      const carts = await this.cartItemsService.findAllCartItems(user);
      res.status(200).json(carts);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  @Get('allUserCart')
  async fetchAllCartUSer(@Res() res: Response) {
    try {
      const user = res.locals.verifiedUser;
      const carts = await this.cartItemsService.findAllCartUser(user);
      res.status(200).json(carts);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }


  @Get(':id')
  findOne(@Param('id') product_id: string) {
    return this.cartItemsService.findOne(product_id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCartItemDto: UpdateCartItemDto,
  // ) {
  //   return this.cartItemsService.update(+id, updateCartItemDto);
  // }

  @Delete('delete/:id')
  async deleteCart(@Param('id') id: string, @Res() res : Response) {
    try {
      console.log("hit delete",id);
      const deletedCart = await this.cartItemsService.deleteCart(id);
      return res.status(200).json(deletedCart);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
