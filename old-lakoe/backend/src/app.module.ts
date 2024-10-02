import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

import { CartItemsModule } from './cart-items/cart-items.module';
import { FormProdukModule } from './form-produk/form-produk.module';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { AuthMiddleware } from './middlewares/authenticate.middleware';
import { UsersController } from './users/users.controller';
// import { upload } from './middlewares/image-multer';
import { BuyersModule } from './buyers/buyers.module';
import { FormProdukController } from './form-produk/form-produk.controller';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentModule } from './payment/payment.module';
import { CartItemsController } from './cart-items/cart-items.controller';
import { WithdrawModule } from './withdraw/withdraw.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [UsersModule, FormProdukModule, LoginModule, BuyersModule, ProductModule, CategoriesModule, PaymentModule,CartItemsModule, WithdrawModule, BankAccountModule, VoucherModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        // { path: 'login/auth', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST },
        {path: 'users/verify/:token', method: RequestMethod.GET},
        {path: 'users/change-password/:token', method: RequestMethod.PATCH},
        {path: 'users/request-password', method: RequestMethod.POST},
        {path: 'form-produk/order-couriers/:invID', method: RequestMethod.POST},
      )
      .forRoutes(LoginController, FormProdukController, UsersController, CartItemsController);

    // consumer.apply(upload.any()).forRoutes(FormProdukModule);
  }
}
