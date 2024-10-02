import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { BuyersService } from './buyers.service';
import {
  buyerData,
  buyProducts,
  confirmation_courier,
  confirmation_payment,
  CreateBuyerDto,
} from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { Request, Response } from 'express';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  create(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }

  @Post('/rates/:storeid')
  getCouriers(
    @Param('storeid') store_id: string,
    @Body() buyerData: buyerData,
  ) {
    return this.buyersService.getRates(buyerData, store_id);
  }

  @Get('products/:id')
  async fetchProductTokoBuyer(
    @Param('id') idToko: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const productFetched = await this.buyersService.fetchProdukToko(idToko);
      res.status(200).json(productFetched);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  
  @Get('discount/:discode')
  async discount(@Param('discode') disc_code: string, @Res() res : Response, @Req() req : Request) {
    try {
      const discount = await this.buyersService.discount(disc_code)
      res.status(200).json(discount);
    } catch(err){
      return res.status(400).json(err.message)
    }
  }

  @Get('products')
  async fetchProductAllBuyer(@Res() res: Response, @Req() req: Request) {
    try {
      const productFetched = await this.buyersService.fetchProdukAll();
      res.status(200).json(productFetched);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('status/:invoice')
  async midtransStatus(
    @Param('invoice') invoiceId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      // console.log('HIT CHECK')
      const paymentStatus =
        await this.buyersService.checkPaymentStatus(invoiceId);
      res.status(200).json(paymentStatus);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Post('confirm-payments')
  async ConfirmPayments(
    @Body() confirmation: confirmation_payment,
    @Res() res: Response,
  ) {
    try {
      // console.log(confirmation)
      const notificationPayment =
        await this.buyersService.confirmPayment(confirmation);
      res.status(200).json(notificationPayment);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  @Post('confirm-couriers')
  async ConfirmCouriers(
    @Body() confirmation: confirmation_courier,
    @Res() res: Response,
  ) {
    try {
      const notificationCourier =
        await this.buyersService.confirmCourier(confirmation);
      res.status(200).json(notificationCourier);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  @Post('buy')
  async BuyProduct(@Body() buyProducts: buyProducts, @Res() res: Response) {
    try {
      const orderInvoice = await this.buyersService.buyProducts(buyProducts);
      return res.status(200).json(orderInvoice);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  @Get('cart/:userid')
  async getCart(
    @Param('userid') user_id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      // console.log('HIT CHECK')
      const cart = await this.buyersService.getCart(user_id);
      res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('test')
  test() {
    return 'Hello World';
  }

  @Get('redirect')
  redirect(@Res() res: Response) {
    const frontendUrl = process.env.FRONTEND_URL;
    return res.redirect(`${frontendUrl}`);
  }

  @Get('store')
  async fetchStore(@Res() res: Response, @Req() req: Request) {
    try {
      const store = await this.buyersService.findAllStore();
      res.status(200).json(store);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyerDto: UpdateBuyerDto) {
    return this.buyersService.update(+id, updateBuyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyersService.remove(+id);
  }
}
