import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  addLocation,
  bank,
  ChangePasswordDTO,
  CreateUserDto,
  editStores,
  location,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { transporter } from '../libs/transporter';
import { diskStorage, memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.create(createUserDto, req);
      // console.log(user)
      return res.status(201).json({
        stats: 'user created',
        email: user.user.email,
        store: user.storeCreated,
      });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('/verify/:token')
  async verify(@Param('token') token: string, @Res() res: Response) {
    try {
      const frontendUrl = process.env.FRONTEND_URL;
      const verifiedUser = await this.usersService.verify(token);
      return res.redirect(`${frontendUrl}`);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  // @Patch('/bank')
  // @Header("content-type","application/json")
  // async bank(@Body() bankAcc: bank,@Res() res : Response) {
  //   try{
  //     const user = res.locals.verifiedUser;
  //     const userBank = await this.usersService.updateBankData(bankAcc,user.store_id);
  //     return res.status(200).json(userBank);
  //   }catch(err){
  //     return res.status(400).json(err.message)
  //   }
  // }

  @Get('/bank')
  async updateBank(@Res() res: Response) {
    try {
      const user = res.locals.verifiedUser;
      const userBank = await this.usersService.getBankData(user.store_id);
      return res.status(200).json(userBank);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Post('/request-password')
  @Header('content-type', 'application/json')
  async requestPassword(
    @Body() changePassDTO: ChangePasswordDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const email = req.body.email;
      const userData = await this.usersService.checkEmail(email);
      if (!userData) throw new Error('User for password reset not found');

      const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      const fullUrl = process.env.FRONTEND_URL;

      const info = await transporter.sendMail({
        from: `Lakoe <${process.env.EMAIL_ADDRESS}>`, // sender address
        to: email, // list of receivers
        subject: 'Reset Password Link', // Subject line
        html: `<div style="background-color: #FFF; margin: auto; width: 50%; text-align: center; padding: 1rem; border-radius: 12px; font-family: Arial, Helvetica, sans-serif; color: black;">
            <H1 style="color: #b91c1c; font-weight: bold;">Lakoe App</H1>
            <p style="font-size: 0.8rem;">Welcome to Lakoe App!<br> Click the button below to change your password</p>
            <Button style="background-color: #b91c1c; border: none; border-radius: 12px; height: 40px; margin: 1rem;"><a style="text-decoration: none; color: white; margin: 0.5rem; font-size: 1rem;" href="${fullUrl}/auth/change-password/${token}">Change Password</a></Button>
            <p style="font-size: 0.8rem;">Please ignore this message if you feel that you are not registering to our services.</p>
            <p style="font-size: 0.8rem; margin-top: 0.33rem;"> Thank you for using our services.</p>
        </div>`, // html body
      });

      res.status(201).json({
        stats: 'user created',
        email: userData.email,
        smtp: info,
      }).send;
    } catch (err) {
      res.sendStatus(400);
    }
  }

  @Patch('/change-password/:token')
  @Header('content-type', 'application/json')
  async changePassword(
    @Param('token') token: string,
    @Body() changePassDTO: ChangePasswordDTO,
    @Res() res: Response,
  ) {
    try {
      const frontendUrl = process.env.FRONTEND_URL;
      // console.log("Changepass", frontendUrl);
      const verify: any = await jwt.verify(token, process.env.JWT_SECRET);
      if (!verify) throw new Error('Token link error please request again');

      // console.log("change pass",verify.id)
      const newUser = await this.usersService.ChangePassword(
        changePassDTO,
        String(verify.id),
      );
      return res.status(201).json({
        stats: 'Password Changed',
      }).send;
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  // @Post("/location")
  // @Header("content-type","application/json")
  // async postLocation(@Body() senderLocation: location,@Req() req : Request, @Res() res : Response) {
  //   try {
  //     const location = await this.usersService.postLocation(senderLocation)
  //     return "This is a post location"
  //   } catch(err) {
  //     return res.status(400).json(err.message)
  //   }
  // }

  @Post('location')
  async addLocation(@Body() addLocation: addLocation, @Res() res: Response) {
    try {
      
      const newLocation = await this.usersService.addLocation(addLocation);
      return res.status(200).json(newLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('location')
  async getAllLocation(@Res() res: Response) {
    try {
      const allLocation = await this.usersService.getAllLocation();
      return res.status(200).json(allLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('chart')
  async getChart(@Res() res: Response) {
    try {
      const allLocation = await this.usersService.getAllLocation();
      return res.status(200).json(allLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('location/:id')
  async getAllLocationByStore(@Res() res: Response, @Param('id') id: string) {
    try {
      const allLocation = await this.usersService.getAllLocationByStore(id);
      return res.status(200).json(allLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Patch('location/:id')
  async editLocation(
    @Body() editLocation: addLocation,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const allLocation = await this.usersService.editLocation(
        editLocation,
        id,
      );
      return res.status(200).json(allLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Patch('stores/:id')
  @Header("content-type","multipart/form-data")
  @UseInterceptors(FileInterceptor("logo_attachment", {storage: memoryStorage()}))
  async editStores(@UploadedFile() file: Express.Multer.File, @Body() editStores: editStores,@Res() res : Response, @Param('id') id : string) {
    try {
      console.log(file, editStores);
      const newStore = await this.usersService.editStores(editStores, file, id);
      return res.status(200).json(newStore);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Get('/stores/:id')
  async getStore(@Res() res: Response, @Param('id') id: string) {
    try {
      const store = await this.usersService.storeUser(id);
      return res.status(200).json(store);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Delete('location/:id')
  async deleteLocation(@Res() res: Response, @Param('id') id: string) {
    try {
      const allLocation = await this.usersService.deleteLocation(id);
      return res.status(200).json(allLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Post('location/active/:id')
  async setActiveLocation(@Res() res: Response, @Param('id') id: string) {
    try {
      const allLocation = await this.usersService.setMainLocation(id);
      return res.status(200).json(allLocation);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
