import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InvoiceStatus } from '@prisma/client';

@Injectable()
export class CartItemsService {
  constructor(private readonly prismaService: PrismaService) { }

  async addCarts(
    createCartItemDto: CreateCartItemDto,
    product_id: string,
    user: any,
    varian_id : string
  ) {
    // console.log('hit');
    const products = await this.prismaService.products.findUnique({
      where: {
        id: product_id,
      },
    });


    // const carts = await this.prismaService.carts.findMany({
    //   where: {
    //     users_id: user.id,
    //   },
    // });

    const newCarts = await this.prismaService.carts.create({
      data: {
        discount: 0,
        prices: 0,
        users_id: user.id
      }
    })

    const variant = await this.prismaService.variants.findUnique({
      where : {
        id : varian_id
      }, include : {
        variant_option : true
      }
    })

    const variant_options = await this.prismaService.variant_options.findUnique({
      where : {
        id : variant.variant_option[0].id
      }, include : {
        variant_option_values : true
      }
    })

    const variant_values = await this.prismaService.variant_option_values.findUnique({
      where : {
        variant_option_id : variant_options.id
      }
    })

    const updated_values = await this.prismaService.variant_option_values.update({
      where : {
        id : variant_values.id
      }, data : {
        stock : (variant_values.stock -= createCartItemDto.quantity)
      }
    })

    const updated_product = await this.prismaService.products.findUnique({
      where : {
        id: product_id
      }, include : {
        variants : {
          include : {
            variant_option : {
              include : {
                variant_option_values : true
              }
            }
          }
        }
      }
    })

    const updated_variants = updated_product.variants[0].variant_option.map((val) =>
      val.variant_option_values.stock)

    const isEmpty = updated_variants.every(val => val === 0 || val < products.minimum_order);

    console.log('isEmpty', isEmpty)

    if(isEmpty){
      await this.prismaService.products.update({
        where : {
          id: product_id
        }, data : {
          is_active : false
        }
      })
    }

    console.log(updated_values);

    return this.prismaService.carts_items.create({
      data: {
        img: createCartItemDto.attachments[0],
        name: createCartItemDto.name,
        price: createCartItemDto.price,
        quantity: createCartItemDto.quantity,
        cart_id: newCarts.id,
        store_id: products.store_id,
        product_id : product_id
      },
    });
  }

  async addCartsLangsung(
    createCartItemDto: CreateCartItemDto,
    product_id: string,
    user: any,
    varian_id : string
  ) {
    // console.log('hit');
    const products = await this.prismaService.products.findUnique({
      where: {
        id: product_id,
      },
    });


    // const carts = await this.prismaService.carts.findMany({
    //   where: {
    //     users_id: user.id,
    //   },
    // });

    const newCarts = await this.prismaService.carts.create({
      data: {
        discount: 0,
        prices: 0,
        users_id: user.id
      }
    })

    const variant = await this.prismaService.variants.findUnique({
      where : {
        id : varian_id
      }, include : {
        variant_option : true
      }
    })

    const variant_options = await this.prismaService.variant_options.findUnique({
      where : {
        id : variant.variant_option[0].id
      }, include : {
        variant_option_values : true
      }
    })

    const variant_values = await this.prismaService.variant_option_values.findUnique({
      where : {
        variant_option_id : variant_options.id
      }
    })

    const updated_values = await this.prismaService.variant_option_values.update({
      where : {
        id : variant_values.id
      }, data : {
        stock : (variant_values.stock -= createCartItemDto.quantity)
      }
    })

    console.log(updated_values);

    const cartsItem = await this.prismaService.carts_items.create({
      data: {
        img: createCartItemDto.attachments[0],
        name: createCartItemDto.name,
        price: createCartItemDto.price,
        quantity: createCartItemDto.quantity,
        cart_id: newCarts.id,
        store_id: products.store_id,
        product_id : product_id
      },
    });

    return cartsItem.id
  }

  async findAllCartItems(user: any) {
    try {
      const carts = await this.prismaService.carts.findMany({
        where: {
          users_id: user.id,
        },
      });
      // console.log(carts)

      const items = await this.prismaService.carts_items.findMany({
        where: {
          cart_id: carts[carts.length - 1].id,
        },
      });

      return items;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllCartUser(user: any) {
    try {
      const carts = await this.prismaService.carts.findMany({
        where: {
          users_id: user.id,
        }, include: {
          carts_items: true,
          invoices: true
        }
      });
      // console.log(carts)

      // const items = await this.prismaService.carts_items.findMany({
      //   where: {
      //     cart_id: carts[carts.length - 1].id,
      //   },
      // });
      // console.log("cart", carts)
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(product_id: string) {
    const productItem = await this.prismaService.carts_items.findUnique({
      where: { id: product_id },
    });

    // console.log("ini produk item",productItem);

    return productItem;
  }

  async deleteCart(cart_id: string) {
    try {
      console.log('cart', cart_id)
      const invoice = await this.prismaService.invoices.findUnique({
        where : {
          cart_id : cart_id 
        }
      })

      console.log(invoice);
      console.log(cart_id);

      const deletedCarts = await this.prismaService.carts.findUnique({
        where : {
          id: cart_id
        }, include : {
          carts_items : {
            include : {
              product : true
            }
          }
        }
      });

      console.log('del', deletedCarts);

      if (invoice) {
        await this.prismaService.invoices.update({
          where : {
            id : invoice.id
          }, data : {
            status : InvoiceStatus.DIBATALKAN
          }
        })
      } 

      console.log('prod', deletedCarts)
  
      const deletedProduct = await this.prismaService.products.findUnique({
        where : {
          id : deletedCarts.carts_items[0].product_id
        }, include : {
          variants : {
            include : {
              variant_option : {
                include : {
                  variant_option_values : true
                }
              }
            }
          }
        }
      })
  
      await this.prismaService.variant_option_values.update({
        where : {
          id : deletedProduct.variants[0].variant_option[0].variant_option_values.id
        }, data : {
          stock : deletedProduct.variants[0].variant_option[0].variant_option_values.stock + deletedCarts.carts_items[0].quantity
        }
      })

      if(!invoice){
        const del = await this.prismaService.carts.delete({
          where : {
            id: cart_id
          }
        });
      }

      return deletedProduct;
    } catch (error) {
      throw new Error(error);
    }
    
  }
}
