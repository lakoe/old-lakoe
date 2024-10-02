import { Injectable } from '@nestjs/common';
import {
  buyerData,
  buyProducts,
  confirmation_courier,
  confirmation_payment,
  CreateBuyerDto,
} from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import Axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { InvoiceStatus } from '@prisma/client';

@Injectable()
export class BuyersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createBuyerDto: CreateBuyerDto) {
    return 'This action adds a new buyer';
  }

  async getRates(buyerData: buyerData, store_id: string) {
    const stores = await this.prismaService.stores.findUnique({
      where: {
        id: store_id,
      },
      include: {
        courier_list: true,
      },
    });

    const storeLocation = await this.prismaService.location.findFirst({
      where: {
        store_id: store_id,
      },
    });

    // console.log(store_id);

    const listKurir = stores.courier_list.map(
      (list) => list.courier_service_name,
    );

    const getRates = {
      origin_latitude: Number(storeLocation.lattitude),
      origin_longitude: Number(storeLocation.Longitude),
      destination_latitude: Number(buyerData.destination_latitude),
      destination_longitude: Number(buyerData.destination_longitude),
      couriers: listKurir.join(),
      items: buyerData.items,
    };

    const response = await Axios({
      method: 'post',
      url: `https://api.biteship.com/v1/rates/couriers`,
      data: getRates,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BITESHIP_TOKEN}`,
      },
    });

    const rate = {
      logo: stores.courier_list.map((val) => val.logo),
      origin: response.data.origin,
      destination: response.data.destination,
      courier: response.data.pricing.map((value) => {
        const couriers = {
          name: value.courier_code,
          service: value.courier_service_code,
          duration: value.duration,
          price: value.price,
          logo: stores.courier_list.filter(
            (list) => list.courier_service_name === value.courier_code,
          )[0].logo,
        };
        return couriers;
      }),
    };
    return rate;
  }

  async fetchProdukToko(idToko: string) {
    try {
      if (!idToko) throw new Error('toko not found');

      const produkToko = await this.prismaService.products.findMany({
        where: {
          store_id: idToko,
        },
        include: {
          variants: {
            include: {
              variant_option: {
                include: {
                  variant_option_values: true,
                },
              },
            },
          },
        },
      });

      if (!produkToko) throw new Error('produk not found');

      return produkToko;
    } catch (error) {
      throw new Error(error);
    }
  }

  async discount( disc_code : string) {
    try {
      console.log('disc', disc_code);
      const discount = await this.prismaService.discounts.findFirst({
        where : {
          code : disc_code
        }
      })

      console.log(discount);
      if (!discount) throw new Error("Discount not found");
      return discount;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchProdukAll() {
    try {
      const produk: any = await this.prismaService.products.findMany({
        include: {
          variants: {
            include: {
              variant_option: {
                include: {
                  variant_option_values: true,
                },
              },
            },
          },
          store: true,
        },
      });

      if (!produk) throw new Error('produk not found');
      const filteredProduct = produk.filter((prod: any) => prod.is_active);

      return filteredProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmPayment(confirmation: confirmation_payment) {
    try {
      const invoices = await this.prismaService.invoices.findFirst({
        where: {
          id: confirmation.order_id,
        },
      });

      if (!invoices) throw new Error('invoice is not found');

      const confirm = await this.prismaService.payments.create({
        data: {
          amount: confirmation.gross_amount,
          bank: confirmation.payment_type,
          status: confirmation.transaction_status,
          midtrans_order_id: confirmation.order_id,
          users_id: invoices.user_id,
        },
      });

      if (confirm.status === 'settlement' || confirm.status === 'capture') {
        await this.prismaService.invoices.update({
          where: {
            id: confirm.midtrans_order_id,
          },
          data: {
            status: InvoiceStatus.PESANAN_BARU,
          },
        });

        await this.updateHistory(invoices.id, InvoiceStatus.PESANAN_BARU);
      } else if (confirm.status !== 'pending') {
        await this.prismaService.invoices.update({
          where: {
            id: confirm.midtrans_order_id,
          },
          data: {
            status: InvoiceStatus.DIBATALKAN,
          },
        });
        await this.updateHistory(invoices.id, InvoiceStatus.DIBATALKAN);
      }

      return confirm;
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmCourier(confirmation: confirmation_courier) {
    try {
      const couriers = await this.prismaService.couriers.findFirst({
        where: {
          tracking_id: confirmation.courier_tracking_id,
        },
        include: {
          invoice: true,
        },
      });

      if (!couriers) throw new Error('Couriers is not found');

      if (confirmation.status === 'picked') {
        await this.prismaService.invoices.update({
          where: {
            id: couriers.invoice.id,
          },
          data: {
            status: InvoiceStatus.DALAM_PENGIRIMAN,
          },
        });

        await this.updateHistory(
          couriers.invoice.id,
          InvoiceStatus.DALAM_PENGIRIMAN,
        );
      } else if (confirmation.status === 'delivered') {
        await this.prismaService.invoices.update({
          where: {
            id: couriers.invoice.id,
          },
          data: {
            status: InvoiceStatus.PESANAN_SELESAI,
          },
        });
        await this.updateHistory(
          couriers.invoice.id,
          InvoiceStatus.PESANAN_SELESAI,
        );
      }

      return confirmation;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateHistory(invoice_id: string, status: InvoiceStatus) {
    try {
      return await this.prismaService.invoice_histories.create({
        data: {
          invoice_id: invoice_id,
          status: status,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async buyProducts(buyProducts: buyProducts) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: {
          id: buyProducts.user_id,
        },
        include: {
          carts: true,
        },
      });

      const carts = await this.prismaService.carts.findUnique({
        where: {
          id: user.carts[user.carts.length - 1].id,
        },
      });

      const cart_items = await this.prismaService.carts_items.findMany({
        where: {
          cart_id: carts.id,
        },
      });

      if (!cart_items) throw new Error('carts empty');

      // let pricesTotal: number = 0;
      // cart_items.forEach((value) => {
      //   const price = value.price * value.quantity;
      //   pricesTotal += price;
      // });

      console.log(buyProducts);

      const user_id = carts.users_id;

      const data = {
        ...buyProducts,
        user_id: user_id,
      };

      const stores = await this.prismaService.stores.findUnique({
        where: {
          id: buyProducts.store_id,
        },
      });

      const mainStoreLocation =
        await this.prismaService.location.findFirst({
          where: {
            store_id: buyProducts.store_id,
            is_main_location: true,
          },
        });

      if (!mainStoreLocation) throw new Error('location is not found');

      const getRates = {
        origin_latitude: Number(mainStoreLocation.lattitude),
        origin_longitude: Number(mainStoreLocation.Longitude),
        destination_latitude: Number(buyProducts.receiver_latitude),
        destination_longitude: Number(buyProducts.receiver_longitude),
        couriers: stores.courier.join(),
        items: cart_items,
      };

      // console.log(getRates);
      const response = await Axios({
        method: 'post',
        url: `https://api.biteship.com/v1/rates/couriers`,
        data: getRates,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BITESHIP_TOKEN}`,
        },
      });

      // console.log(response.data)

      await this.prismaService.location.update({
        where: {
          id: mainStoreLocation.id,
        },
        data: {
          postal_code: response.data.origin.postal_code,
        },
      });

      console.log('data',data);

      let invoice;
      if(data.discount_id)
      {
        invoice = await this.prismaService.invoices.create({
         data: {
           prices: buyProducts.prices,
           receiver_address: data.receiver_address,
           receiver_district: data.receiver_district,
           receiver_latitude: data.receiver_latitude,
           receiver_longitude: data.receiver_longitude,
           receiver_name: data.receiver_name,
           receiver_phone: data.receiver_phone,
           receiver_postal_code: response.data.destination.postal_code,
           service_charge: data.service_charge,
           cart_id: user.carts[user.carts.length - 1].id,
           user_id: data.user_id,
           store_id: data.store_id,
           discount_id : data.discount_id
         },
       });
      } else {
        invoice = await this.prismaService.invoices.create({
          data: {
            prices: buyProducts.prices,
            receiver_address: data.receiver_address,
            receiver_district: data.receiver_district,
            receiver_latitude: data.receiver_latitude,
            receiver_longitude: data.receiver_longitude,
            receiver_name: data.receiver_name,
            receiver_phone: data.receiver_phone,
            receiver_postal_code: response.data.destination.postal_code,
            service_charge: data.service_charge,
            cart_id: user.carts[user.carts.length - 1].id,
            user_id: data.user_id,
            store_id: data.store_id,
          },
        });
      }

      if (!invoice) throw new Error('invoice is not created');
      await this.updateHistory(invoice.id, InvoiceStatus.BELUM_DIBAYAR);

      const courier = await this.prismaService.couriers.create({
        data: {
          courier_code: buyProducts.courier_code,
          courier_service_name: buyProducts.courier_service,
          price: buyProducts.service_charge,
          invoice_id: invoice.id,
        },
      });

      if (!courier) throw new Error('courier not created');

      const dataMidtrans = {
        transaction_details: {
          order_id: invoice.id,
          gross_amount: invoice.prices + invoice.service_charge,
        },
      };

      // console.log(dataMidtrans);
      const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
      const encodedKey = Buffer.from(midtransServerKey + ':').toString(
        'base64',
      );

      const midtrans = await Axios({
        method: 'post',
        url: `https://app.sandbox.midtrans.com/snap/v1/transactions`,
        data: dataMidtrans,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedKey}`,
        },
      });

      if (midtrans.status !== 201) {
        await this.prismaService.couriers.delete({
          where: {
            id: courier.id,
          },
        });

        await this.prismaService.invoices.delete({
          where: {
            id: invoice.id,
          },
        });
      }

      // const cartsUser = await this.prismaService.carts.create({
      //   data: {
      //     discount: 0,
      //     prices: 0,
      //     users_id: invoice.user_id,
      //   },
      // });

      await this.prismaService.invoices.update({
        where: {
          id: invoice.id,
        },
        data: {
          midtrans_token_id: midtrans.data.token,
        },
      });
      return midtrans.data;
    } catch (error) {
      // console.log(error.message)
      throw new Error(error.message);
    }
  }

  async checkPaymentStatus(invoice_id: string) {
    try {
      const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
      const encodedKey = Buffer.from(midtransServerKey + ':').toString(
        'base64',
      );

      const confirm: any = await Axios({
        method: 'get',
        url: `https://api.sandbox.midtrans.com/v2/${invoice_id}/status`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedKey}`,
        },
      });

      let statusInvoice;
      if (
        confirm.data.transaction_status === 'settlement' ||
        confirm.data.transaction_status === 'capture'
      ) {
        // console.log("PAYMENT CONFIRMED");

        statusInvoice = await this.prismaService.invoices.update({
          where: {
            id: confirm.data.order_id,
          },
          data: {
            status: InvoiceStatus.PESANAN_BARU,
          },
        });
        await this.updateHistory(invoice_id, InvoiceStatus.PESANAN_BARU);
      } else if (confirm.data.transaction_status !== 'pending') {
        statusInvoice = await this.prismaService.invoices.update({
          where: {
            id: confirm.data.order_id,
          },
          data: {
            status: InvoiceStatus.DIBATALKAN,
          },
        });
        await this.updateHistory(invoice_id, InvoiceStatus.PESANAN_BARU);
      }
      return statusInvoice;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllStore() {
    try {
      const store: any = await this.prismaService.stores.findMany();

      if (!store) throw new Error('store not found');
      // console.log(produk);
      return store;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCart(user_id: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          id: user_id,
        },
        include: {
          carts: {
            include: {
              carts_items: true,
            },
          },
        },
      });

      return user.carts[user.carts.length - 1];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all buyers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyer`;
  }

  update(id: number, updateBuyerDto: UpdateBuyerDto) {
    return `This action updates a #${id} buyer`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyer`;
  }
}
