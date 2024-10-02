import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import {
  addLocation,
  bank,
  ChangePasswordDTO,
  CreateUserDto,
  editStores,
  location,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as Bcrypt from 'bcrypt';
import { transporter } from '../libs/transporter';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto, @Req() req: Request) {
    try {
      const hashedPassword = await new Promise<string>(function (
        resolve,
        reject,
      ) {
        Bcrypt.hash(createUserDto.password, 10, async function (err, hashed) {
          if (err) {
            reject(new Error('error hashing'));
          } else {
            resolve(hashed);
          }
        });
      });
      const token = jwt.sign(createUserDto.email, process.env.JWT_SECRET);
      // console.log(token);

      const fullUrl = process.env.BACKEND_URL;

      // console.log(process.env.EMAIL_ADDRESS);

      const info = await transporter.sendMail({
        from: `Lakoe <${process.env.EMAIL_ADDRESS}>`, // sender address
        to: createUserDto.email, // list of receivers
        subject: 'Verification Link', // Subject line
        html: `
        <div style="background-color: #FFF; margin: auto; width: 50%; text-align: center; padding: 1rem; border-radius: 12px; font-family: Arial, Helvetica, sans-serif; color: black;">
            <H1 style="color: #b91c1c; font-weight: bold;">Lakoe App</H1>
            <p style="font-size: 0.8rem;">Welcome to Lakoe App!<br> Click the button below to verify your account</p>
            <Button style="background-color: #b91c1c; border: none; border-radius: 12px; height: 40px; margin: 1rem;"><a style="text-decoration: none; color: white; margin: 0.5rem; font-size: 1rem;" href="${fullUrl}/users/verify/${token}">Verify</a></Button>
            <p style="font-size: 0.8rem;">Please ignore this message if you feel that you are not registering to our services.</p>
            <p style="font-size: 0.8rem; margin-top: 0.33rem;"> Thank you for using our services.</p>
        </div>
        `, // html body
      });

      const user = await this.prismaService.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      let storeCreated;
      if (user && createUserDto.role_id === 2) {
        const store = await this.prismaService.stores.create({
          data: {
            name: user.name,
          },
        });
        storeCreated = store;
        await this.prismaService.users.update({
          where: {
            id: user.id,
          },
          data: {
            store_id: storeCreated.id,
          },
        });

        await this.prismaService.location.create({
          data: {
            store_id: storeCreated.id,
          },
        });
      }

      // if (user && createUserDto.role_id === 1) {
      //   const cartsUser = await this.prismaService.carts.create({
      //     data: {
      //       discount: 0,
      //       prices: 1,
      //       users_id : user.id
      //     }
      //   });
      // }

      return { user, storeCreated };
    } catch (err) {
      throw new Error(err);
    }
  }

  async verify(token: string) {
    try {
      const isVerified = jwt.verify(token, process.env.JWT_SECRET);
      if (!isVerified) throw new Error('User cannot be verified!');
      // console.log("Verify");
      return await this.prismaService.users.update({
        data: {
          isVerified: true,
        },
        where: {
          email: String(isVerified),
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async checkEmail(userEmail: string) {
    try {
      return await this.prismaService.users.findUnique({
        where: { email: userEmail },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getBankData(store_id: string) {
    try {
      return await this.prismaService.bank_accounts.findFirst({
        where: { store_id: store_id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async storeUser(store_id: string) {
    try {
      return await this.prismaService.stores.findUnique({ where: { id: store_id }, include : {
        location : true
      } });
    } catch (err) {
      throw new Error(err);
    }
  }

  // async updateBankData(bankData: bank, store_id: string) {
  //   try {
  //     return await this.prismaService.bank_accounts.update({
  //       where: {
  //         store_id: store_id
  //       },
  //       data: {
  //         bank: bankData.bank,
  //         acc_number: bankData.acc_number,
  //         acc_name: bankData.acc_name
  //       }
  //     });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

  async ChangePassword(changePassDTO: ChangePasswordDTO, userId: string) {
    try {
      const encPassword = await new Promise<string>((resolve, reject) => {
        Bcrypt.hash(changePassDTO.password, 10, async function (err, hash) {
          if (err) {
            reject(new Error('error hashing'));
          } else {
            resolve(hash);
          }
        });
      });

      // console.log("change pass service", userId);
      const updatedData = await this.prismaService.users.update({
        where: { id: userId },
        data: { password: encPassword },
      });
      return updatedData;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id,
      },
    });

    if (!thisUser) throw new NotFoundException('User not found!');

    return await this.prismaService.users.update({
      where: {
        id: thisUser.id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const thisUser = await this.prismaService.users.findFirst({
      where: {
        id,
      },
    });

    if (!thisUser) throw new NotFoundException('User not found!');

    return await this.prismaService.users.delete({
      where: {
        id,
      },
    });
  }

  async addLocation(addLocation: addLocation) {
    try {
      const location = await this.prismaService.location.create({
        data: {
          name: addLocation.name,
          address: addLocation.address,
          city_district: addLocation.city_district,
          lattitude: addLocation.lattitude,
          Longitude: addLocation.longitude,
          store_id: addLocation.store_id,
          postal_code: Number(addLocation.postal_code),
          is_main_location: addLocation.is_main_location,
        },
      });
      return location;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllLocation() {
    try {
      return await this.prismaService.users.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getChart() {
    try {
      const invoice = await this.prismaService.users.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllLocationByStore(id: string) {
    try {
      return await this.prismaService.location.findMany({
        where: { store_id: id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteLocation(location_id: string) {
    try {
      return await this.prismaService.location.delete({
        where: { id: location_id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async editLocation(editLocation: addLocation, location_id: string) {
    try {
      return await this.prismaService.location.update({
        where: { id: location_id },
        data: {
          name: editLocation.name,
          address: editLocation.address,
          city_district: editLocation.city_district,
          lattitude: editLocation.lattitude,
          Longitude: editLocation.longitude,
          store_id: editLocation.store_id,
          postal_code: Number(editLocation.postal_code),
          is_main_location: editLocation.is_main_location,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async editStores(
    editStores: editStores,
    file: Express.Multer.File,
    store_id: string,
  ) {
    try {
      let logoStore;
      console.log(file);
      if (file) {
        const imagecloud : any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }).end(file.buffer);
        });
        logoStore = imagecloud.secure_url;
      }

      let newStore;
      if (logoStore) {
        newStore = await this.prismaService.stores.update({
          where: {
            id: store_id,
          },
          data: {
            logo_attachment: logoStore,
            name: editStores.name,
            slogan: editStores.slogan,
            description: editStores.description,
          },
        });
      } else {
        newStore = await this.prismaService.stores.update({
          where: {
            id: store_id,
          },
          data: {
            name: editStores.name,
            slogan: editStores.slogan,
            description: editStores.description,
          },
        });
      }

      console.log(newStore);
      return newStore;
    } catch (err) {
      throw new Error(err);
    }
  }

  async setMainLocation(location_id: string) {
    try {
      await this.prismaService.location.updateMany({
        data: { is_main_location: false },
      });

      return await this.prismaService.location.update({
        where: {
          id: location_id,
        },
        data: {
          is_main_location: true,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
