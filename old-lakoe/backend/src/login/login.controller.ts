import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req, Res, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() createLoginDto: CreateLoginDto, @Res() res : Response) {
    try {
      const user = await this.loginService.create(createLoginDto);
      return res.status(201).json(user)
    } catch(err) {
      return res.status(400).json(err.message)
    }
  }

  @Get('/auth')
  async check(@Res() res : Response) {
    try {
      const verifiedID = await res.locals.verifiedUser
      return res.status(201).json(verifiedID)
    } catch(err) {
      return res.status(400).json(err.message)
    }
  }

  @Get(':id')
  changePassword(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
