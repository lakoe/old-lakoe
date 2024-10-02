import { Injectable } from '@nestjs/common';
import { CreateFormProdukDto, kurir_list } from './dto/create-form-produk.dto';
import { UpdateFormProdukDto } from './dto/update-form-produk.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import { InvoiceStatus } from '@prisma/client';
import Axios from 'axios';
import path from 'path';

type file = {
  produk_foto?: Express.Multer.File[];
  produk_foto_1?: Express.Multer.File[];
  produk_foto_2?: Express.Multer.File[];
  produk_foto_3?: Express.Multer.File[];
  produk_foto_4?: Express.Multer.File[];
  produk_ukuran_option_img?: Express.Multer.File[];
};

@Injectable()
export class FormProdukService {
  constructor(private readonly prismaService: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async create(
    createFormProdukDto: CreateFormProdukDto,
    file: any,
    user: any,
  ) {
    try {
      const size = [
        String(createFormProdukDto.produk_panjang),
        String(createFormProdukDto.produk_lebar),
        String(createFormProdukDto.produk_tinggi),
      ];
      

      console.log('file', file);
      let imgProducts = [];
      if (file.produk_foto) {
        const imagecloud : any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }).end(file.produk_foto[0].buffer);
        });
        imgProducts.push(await imagecloud.secure_url);
      }
      if (file.produk_foto_1) {
        const imagecloud : any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }).end(file.produk_foto_1[0].buffer);
        });
        imgProducts.push(await imagecloud.secure_url);
      }
      if (file.produk_foto_2) {
        const imagecloud : any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }).end(file.produk_foto_2[0].buffer);
        });
        imgProducts.push(await imagecloud.secure_url);
      }
      if (file.produk_foto_3) {
        const imagecloud : any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }).end(file.produk_foto_3[0].buffer);
        });
        imgProducts.push(await imagecloud.secure_url);
      }
      if (file.produk_foto_4) {
        const imagecloud : any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }).end(file.produk_foto_4[0].buffer);
        });
        imgProducts.push(await imagecloud.secure_url);
      }

      let imgVariants = [];
      if (file.produk_ukuran_option_img) {
        for (let i = 0; i < file.produk_ukuran_option_img.length; i++) {
          const imagecloud : any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }).end(file.produk_ukuran_option_img[i].buffer);
          });
          imgVariants.push(await imagecloud.secure_url);
        }
      }

      console.log("user ",user.store_id)

      const products = await this.prismaService.products.create({
        data: {
          name: createFormProdukDto.produk_nama,
          description: createFormProdukDto.produk_deskripsi,
          categories_id: createFormProdukDto.produk_kategori,
          is_active: true,
          minimum_order: Number(createFormProdukDto.produk_min_beli),
          size: size,
          attachments: imgProducts,
          store_id: user.store_id,
        },
      });

      let variants;
      if (createFormProdukDto.produk_ukuran_option) {
        variants = createFormProdukDto.produk_ukuran_option.split(',');
      }

      let data;
      if (variants) {
        for (let i = 0; i < variants.length; i++) {
          const variant = await this.prismaService.variants.create({
            data: {
              name: 'Varian',
              is_active: true,
              product_id: products.id,
            },
          });

          const variant_options =
            await this.prismaService.variant_options.create({
              data: {
                name: createFormProdukDto.produk_ukuran_option.split(',')[i],
                variant_id: variant.id,
              },
            });

          const variant_values =
            await this.prismaService.variant_option_values.create({
              data: {
                sku: createFormProdukDto.produk_ukuran_option_sku.split(',')[i],
                weight: Number(
                  createFormProdukDto.produk_ukuran_option_weight.split(',')[i],
                ),
                stock: Number(
                  createFormProdukDto.produk_ukuran_option_stock.split(',')[i],
                ),
                price: Number(
                  createFormProdukDto.produk_ukuran_option_price.split(',')[i],
                ),
                is_active: true,
                img: imgVariants[i],
                variant_option_id: variant_options.id,
              },
            });

          data = {
            product_id: products.id,
            varian_id: variant.id,
          };
        }
      } else {
        const variant = await this.prismaService.variants.create({
          data: {
            name: 'Varian',
            is_active: true,
            product_id: products.id,
          },
        });

        const variant_options = await this.prismaService.variant_options.create(
          {
            data: {
              name: createFormProdukDto.produk_nama,
              variant_id: variant.id,
            },
          },
        );

        const variant_values =
          await this.prismaService.variant_option_values.create({
            data: {
              sku: createFormProdukDto.produk_sku,
              weight: Number(createFormProdukDto.produk_berat[0]),
              stock: Number(createFormProdukDto.produk_stok[0]),
              price: Number(createFormProdukDto.produk_harga[0]),
              is_active: true,
              variant_option_id: variant_options.id,
            },
          });

        data = {
          product_id: products.id,
          varian_id: variant.id,
        };
      }

      return data;
    } catch (err) {
      console.log(err.message);
      throw new Error(err);
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

  async orderCourier(invoice_id: string) {
    try {
      const invoice = await this.prismaService.invoices.findUniqueOrThrow({
        where: {
          id: invoice_id,
        },
        include: {
          cart: {
            include: {
              carts_items: true,
            },
          },
          courier: true,
          store: {
            include: {
              location: true,
            },
          },
          user: true,
        },
      });

      if (!invoice) throw new Error('invoice not found');

      const storeUsers = await this.prismaService.users.findUniqueOrThrow({
        where: {
          store_id: invoice.store_id,
        },
      });

      const mainStoreLocation =
        await this.prismaService.location.findFirst({
          where: {
            store_id: invoice.store_id,
            is_main_location: true,
          },
        });

      const data = {
        origin_contact_name: invoice.store.name,
        origin_contact_phone: storeUsers.phone,
        origin_address: mainStoreLocation.address,
        origin_coordinate: {
          latitude: Number(mainStoreLocation.lattitude),
          longitude: Number(mainStoreLocation.Longitude),
        },
        destination_coordinate: {
          latitude: Number(invoice.receiver_latitude),
          longitude: Number(invoice.receiver_longitude),
        },
        destination_contact_name: invoice.receiver_name,
        destination_contact_phone: invoice.receiver_phone,
        destination_address: invoice.receiver_address,
        courier_company: invoice.courier.courier_code.toLowerCase(),
        courier_type: invoice.courier.courier_service_name.toLowerCase(),
        delivery_type: 'now',
        items: invoice.cart.carts_items,
      };
      console.log(JSON.stringify(data));

      const response = await Axios({
        method: 'post',
        url: `https://api.biteship.com/v1/orders`,
        data: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BITESHIP_TOKEN}`,
        },
      });

      if(!response) throw new Error(response.data.error)

      console.log('hello',response.status);

      if (response.status === 200) {
        await this.prismaService.invoices.update({
          where: {
            id: invoice_id,
          },
          data: {
            status: InvoiceStatus.SIAP_DIKIRIM,
          },
        });

        await this.prismaService.couriers.update({
          where: {
            id: invoice.courier.id,
          },
          data: {
            tracking_id: response.data.courier.tracking_id,
          },
        });

        await this.updateHistory(invoice_id, InvoiceStatus.SIAP_DIKIRIM);
      }

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Batalkan(invoice_id: string) {
    try {
      const invoice = await this.prismaService.invoices.update({
        where: {
          id: invoice_id,
        },
        data: {
          status: InvoiceStatus.DIBATALKAN,
        },
      });

      if (!invoice) throw new Error('invoice not found');

      return invoice;
    } catch (error) {
      throw new Error(error);
    }
  }

  async TambahKurir(
    user_id: string,
    kurir: kurir_list,
    file: Express.Multer.File,
  ) {
    try {
      console.log(user_id);
      const user = await this.prismaService.users.findUnique({
        where: {
          id: user_id,
        },
      });

      const image : any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }).end(file.buffer);
      });

      console.log('path', file.path);

      // let logoKurir;
      // console.log(kurir);
      // if (file) {
      //   const upload = await cloudinary.uploader.upload(file.path, {
      //     upload_preset: 'lakoe',
      //   });
      //   logoKurir = upload.secure_url;
      // }

      console.log("image",image.secure_url);

      const kurir_list = await this.prismaService.courier_list.create({
        data: {
          store_id: user.store_id,
          courier_service_name: kurir.courier_name,
          courier_service_code: kurir.courier_code,
          logo: image.secure_url,
        },
      });
      console.log('list', kurir_list);
      return kurir_list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.prismaService.products.findMany();
  }

  async findPesananStore(id: string) {
    try {
      const pesanan = await this.prismaService.invoices.findMany({
        where: {
          store_id: id,
        },
        include: {
          cart: {
            include: {
              carts_items: true,
            },
          },
        },
      });
      return pesanan;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findPesananStoreStatus(id: string, status: string, order: string) {
    try {
      if (status) {
        let statusInvoice;
        switch (Number(status)) {
          case 0:
            statusInvoice = InvoiceStatus.BELUM_DIBAYAR;
            break;
          case 1:
            statusInvoice = InvoiceStatus.PESANAN_BARU;
            break;
          case 2:
            statusInvoice = InvoiceStatus.SIAP_DIKIRIM;
            break;
          case 3:
            statusInvoice = InvoiceStatus.DALAM_PENGIRIMAN;
            break;
          case 4:
            statusInvoice = InvoiceStatus.PESANAN_SELESAI;
            break;
          case 5:
            statusInvoice = InvoiceStatus.DIBATALKAN;
            break;
        }

        let pesanan;

        if (Number(order) == 1) {
          pesanan = await this.prismaService.invoices.findMany({
            where: {
              store_id: id,
              status: statusInvoice,
            },
            include: {
              cart: {
                include: {
                  carts_items: true,
                },
              },
              user: true,
              courier: true,
              invoice_histories: true,
              discount : true
            },
            orderBy: {
              updated_at: 'asc',
            },
          });
        } else {
          pesanan = await this.prismaService.invoices.findMany({
            where: {
              store_id: id,
              status: statusInvoice,
            },
            include: {
              cart: {
                include: {
                  carts_items: true,
                },
              },
              user: true,
              courier: true,
              invoice_histories: true,
              discount : true
            },
            orderBy: {
              updated_at: 'desc',
            },
          });
        }
        return pesanan;
      } else {
        return await this.findPesananStore(id);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findPesananStoreBulanIni(store_id: string) {
    try {
      const now = new Date();
      console.log(now);
      const pesanan = await this.prismaService.invoices.findMany({
        where: {
          store_id: store_id,
          created_at: {
            gte: new Date(now.getFullYear(), now.getMonth(), 1),
            lte: new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            ),
          },
        },
      });
      console.log('\n');
      console.log('bulan ini', pesanan);
      return pesanan;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findPesananStore6BulanIni(store_id: string) {
    try {
      const startDate = new Date('2024-01-01T00:00:00Z');
      const endDate = new Date('2024-06-30T23:59:59Z');
      const now = new Date();
      console.log(now);
      const pesanan = await this.prismaService.invoices.findMany({
        where: {
          store_id: store_id,
          created_at: {
            gte: new Date(now.getFullYear(), now.getMonth(), 1),
            lte: new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              0,
              23,
              59,
              59,
              999,
            ),
          },
        },
      });
      console.log('\n');
      console.log('bulan ini', pesanan);
      return pesanan;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(product_id: string, varian_id: string) {
    return await this.prismaService.products.findFirst({
      where: {
        id: product_id,
      },
      include: {
        store: true,
        variants: {
          where: {
            id: varian_id,
          },
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
  }

  async getKurir(user_id: string) {
    const user = await this.prismaService.users.findUniqueOrThrow({
      where: {
        id: user_id,
      },
    });

    const store = await this.prismaService.stores.findUnique({
      where: {
        id: user.store_id,
      },
      include: {
        courier_list: true,
      },
    });
    // console.log(inv);
    console.log(store);
    if (!store) return 'Courier Empty';
    return store;
  }

  async getInvoice(invID: string) {
    const inv = await this.prismaService.invoices.findUniqueOrThrow({
      where: {
        id: invID,
      },
      include: {
        invoice_histories: true,
        cart: {
          include: {
            carts_items: true,
          },
        },
      },
    });
    return inv;
  }

  async removeKurir(id: string) {
    return await this.prismaService.courier_list.delete({
      where: {
        id: id,
      },
    });
  }
}
