import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(userId, createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @Delete(':voucherId')
  remove(@Query('userId') userId: string, @Param('voucherId') voucherId: string) {
    return this.voucherService.remove(userId, voucherId);
  }
}
