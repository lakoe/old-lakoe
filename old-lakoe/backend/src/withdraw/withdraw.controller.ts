import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) { }

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createWithdrawDto: CreateWithdrawDto, @Query('bankId') bankId: string) {
    return this.withdrawService.create(userId, createWithdrawDto, bankId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.withdrawService.findAll(userId);
  }

  @Get('admin/:userId')
  findAllAdmin(@Param('userId') userId: string) {
    return this.withdrawService.findAllAdmin(userId);
  }

  @Patch('process/:withdrawId')
  process(@Query('userId') userId: string, @Param('withdrawId') withdrawId: string) {
    return this.withdrawService.process(userId, withdrawId);
  }

  @Patch('reject/r/:withdrawId')
  reject(@Query('userId') userId: string, @Param('withdrawId') withdrawId: string) {
    return this.withdrawService.reject(userId, withdrawId);
  }

  @Patch('done/d/w/:withdrawId')
  done(@Query('userId') userId: string, @Param('withdrawId') withdrawId: string) {
    return this.withdrawService.done(userId, withdrawId);
  }
}
