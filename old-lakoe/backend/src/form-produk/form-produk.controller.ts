import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Req, Res, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FormProdukService } from './form-produk.service';
import { CreateFormProdukDto, kurir_list } from './dto/create-form-produk.dto';
import { UpdateFormProdukDto } from './dto/update-form-produk.dto';
import { Request, Response } from 'express';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage, memoryStorage } from 'multer';
// import {storageMulter } from '../middlewares/image-multer';
import {v2 as cloudinary} from "cloudinary"
import * as path from 'node:path'

@Controller('form-produk')
export class FormProdukController {
  constructor(private readonly formProdukService: FormProdukService) {
    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_SECRET 
    });
  }

  @Post()
  @Header("content-type","multipart/form-data")
  @UseInterceptors((FileFieldsInterceptor([
    { name: 'produk_foto', maxCount: 1 },
    { name: 'produk_foto_1', maxCount: 1 },
    { name: 'produk_foto_2', maxCount: 1 },
    { name: 'produk_foto_3', maxCount: 1 },
    { name: 'produk_foto_4', maxCount: 1 },
    { name: 'produk_ukuran_option_img', maxCount: 99, },
  ],{storage : memoryStorage()})))
 async create(@UploadedFiles() files: { 
  produk_foto?: Express.Multer.File[], 
  produk_foto_1?: Express.Multer.File[],
  produk_foto_2?: Express.Multer.File[],
  produk_foto_3?: Express.Multer.File[],
  produk_foto_4?: Express.Multer.File[],
  produk_ukuran_option_img?: Express.Multer.File[]
},@Body() createFormProdukDto: CreateFormProdukDto, @Req() req : Request, @Res() res : Response) {
    try {
      const userSeller = await res.locals.verifiedUser
      if(userSeller.role_id !== 2)
        throw new Error("Youre not a seller")

      console.log('userr', userSeller)
      // console.log("kategori",createFormProdukDto);
      const produk = await this.formProdukService.create(createFormProdukDto, files, userSeller);
      // console.log(produk)
      return res.status(201).json(produk
      )
    } catch(err) {
      return res.status(400).json(err.message)
    }
  }

  @Get(':id/:varianid')
  async findOne(@Param('id') id: string, @Param('varianid') varian_id: string) {
    return await this.formProdukService.findOne(id,varian_id);
  }

  @Get('pesanan/:storeid')
  async fetchPesanan(@Param('storeid') id: string, @Req() req : Request, @Res() res : Response) {
    try {
      const pesananStore = await this.formProdukService.findPesananStore(id)
      return res.status(201).json(pesananStore)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  @Get('pesanan/:storeid/:status/:order')
  async fetchPesananStatus(@Param('status') status: string,@Param('order') order: string,@Param('storeid') id: string, @Req() req : Request, @Res() res : Response) {
    try {
      // 1= belum bayar, 2 = pesanan baru ...
      const pesananStore = await this.formProdukService.findPesananStoreStatus(id, status, order)
      return res.status(201).json(pesananStore)
    } catch (error) {

      return res.status(400).json(error)
    }
  }

  @Post('bulanini/:storeid')
  async fetchPesananBulanIni(@Param('storeid') id: string, @Res() res : Response) {
    try {
      // 1= belum bayar, 2 = pesanan baru ...
      const pesananStore = await this.formProdukService.findPesananStoreBulanIni(id)
      return res.status(201).json(pesananStore)
    } catch (error) {
      // console.log("error")
      return res.status(400).json(error)
    }
  }

  @Post('order-couriers/:invID')
  async OrderCourier(@Param('invID') invoiceID: string, @Res() res : Response) {
    try {
      const orderCourier = await this.formProdukService.orderCourier(invoiceID);
      return res.status(200).json(orderCourier);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  @Post('batalkan/:invID')
  async Batalkan(@Param('invID') invoiceID: string, @Res() res : Response) {
    try {
      const orderCourier = await this.formProdukService.Batalkan(invoiceID);
      return res.status(200).json(orderCourier);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  @Post('add/kurir/:user_id')
  @Header("content-type","multipart/form-data")
  @UseInterceptors(FileInterceptor("file", {storage: memoryStorage()}))
  async TambahkanKurir(@UploadedFile("file") file: Express.Multer.File, @Param('user_id') invoiceID: string, @Res() res : Response, @Body() kurir: kurir_list) {
    try {
      // console.log(kurir);
      const addCourier = await this.formProdukService.TambahKurir(invoiceID, kurir, file);
      return res.status(200).json(addCourier);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }

  @Get('get/kurir/:user_id')
  async getKurir(@Param('user_id') user_id: string) {
    // console.log("kurir");
    return await this.formProdukService.getKurir(user_id);
  }


  @Get(':invID')
  async getInvoice(@Param('invID') invID: string) {
    return await this.formProdukService.getInvoice(invID);
  }

  @Delete('delete/kurir/:id')
  async removeKurir(@Param('id') id: string) {
    return await this.formProdukService.removeKurir(id);
  }
}
