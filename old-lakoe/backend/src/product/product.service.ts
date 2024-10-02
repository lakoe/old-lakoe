import { Injectable, Search } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async findAll(user_id: string, searchTerm: string, isActive: number, category: string, action: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: user_id
      }
    });

    const productList = await this.prismaService.products.findMany({
      where: {
        store: {
          user: {
            id: user.id
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        variants: {
          include: {
            variant_option: {
              include: {
                variant_option_values: true
              }
            }
          }
        }
      }
    });

    console.log(productList);

    if (productList.length === 0) {
      return [];
    }

    const sortProducts = (products: any[]) => {
      switch (action) {
        case "Semua":
          return products;
        case "2":
          return [...products].sort((a, b) => {
            const priceA = a.variants[0]?.variant_option[0]?.variant_option_values?.price || 0;
            const priceB = b.variants[0]?.variant_option[0]?.variant_option_values?.price || 0;
            return priceB - priceA;
          });
        case "3":
          return [...products].sort((a, b) => {
            const priceA = a.variants[0]?.variant_option[0]?.variant_option_values?.price || 0;
            const priceB = b.variants[0]?.variant_option[0]?.variant_option_values?.price || 0;
            return priceA - priceB;
          });
        case "4":
          return [...products].sort((a, b) => {
            const stockA = a.variants[0]?.variant_option[0]?.variant_option_values?.stock || 0;
            const stockB = b.variants[0]?.variant_option[0]?.variant_option_values?.stock || 0;
            return stockB - stockA;
          });
        case "5":
          return [...products].sort((a, b) => {
            const stockA = a.variants[0]?.variant_option[0]?.variant_option_values?.stock || 0;
            const stockB = b.variants[0]?.variant_option[0]?.variant_option_values?.stock || 0;
            return stockA - stockB;
          });
        default:
          return products;
      }
    };


    const filteredProducts = productList.filter((product) => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      let isActivate = false;

      if (isActive == 1) {
        isActivate = true;
      } else if (isActive == 2) {
        if (product.is_active)
          isActivate = true;
      } else if (isActive == 3) {
        if (!product.is_active)
          isActivate = true;
      }

      const matchesCategory = category === "Semua" || product.categories_id.includes(category);

      return isActivate && matchesSearchTerm && matchesCategory;
    });

    const sortAndFilteredProducts = sortProducts(filteredProducts);

    console.log('sort',isActive)

    return sortAndFilteredProducts;
  }

  async findOne(id: string) {
    return await this.prismaService.invoices.findUnique({
      where: {
        id: id
      }, include: {
        courier: true,
        user: true,
        discount : true,
        invoice_histories: true,
        cart: {
          include: {
            carts_items: true
          }
        }
      }
    });
  }

  async findCategory() {
    return await this.prismaService.categories.findMany();
  }

  async findItem(id: string) {
    return await this.prismaService.carts_items.findUnique({
      where: {
        id: id
      }
    });
  }

  async updatePrice(variantId: string, newPrice: number) {
    return await this.prismaService.variant_option_values.update({
      where: {
        id: variantId
      },
      data: {
        price: newPrice
      }
    });
  }

  async updateStock(variantId: string, newStock: number) {
    return await this.prismaService.variant_option_values.update({
      where: {
        id: variantId
      },
      data: {
        stock: newStock
      }
    });
  }

  async activate(userId: string, productId: string) {
    return await this.prismaService.products.update({
      where: {
        id: productId,
        store: {
          user: {
            id: userId
          }
        }
      },
      data: {
        is_active: true
      }
    });
  }

  async nonactivate(userId: string, productId: string) {
    return await this.prismaService.products.update({
      where: {
        id: productId,
        store: {
          user: {
            id: userId
          }
        }
      },
      data: {
        is_active: false
      }
    });
  }

  async delete(userId: string, productId: string) {
    return await this.prismaService.products.delete({
      where: {
        id: productId,
        store: {
          user: {
            id: userId
          }
        }
      }
    });
  }

  async deleteVariant(variantId: string) {
    return await this.prismaService.variant_option_values.delete({
      where: {
        id: variantId
      }
    });
  }
}
