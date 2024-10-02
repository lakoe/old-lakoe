import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as Bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLoginDto: CreateLoginDto) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email: createLoginDto.email,
        },
        include: {
          carts: true,
          store: {
            include: { location: true },
          },
        },
      });
      if (!user) throw new Error('User Not Found');
      if (!user.isVerified) throw new Error('User not verified!');

      const isValid = await Bcrypt.compare(
        createLoginDto.password,
        user.password,
      );
      if (!isValid) throw new Error('Wrong Password');

      delete user.password;

      const jwtSecret = process.env.JWT_SECRET;
      // console.log(jwtSecret);
      const token = jwt.sign(user, jwtSecret);

      return { user, token };
    } catch (err) {
      throw new Error(err);
    }
  }

  async check(@Res() res: Response) {
    try {
      return res.locals.verifiedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
