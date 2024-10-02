import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) { }

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(userId, createBankAccountDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.bankAccountService.findAll(userId);
  }

  @Patch(':userId/:bankId')
  update(@Param('userId') userId: string, @Param('bankId') bankId: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    return this.bankAccountService.update(userId, bankId, updateBankAccountDto);
  }

  @Delete(':userId/:bankId')
  remove(@Param('userId') userId: string, @Param('bankId') bankId: string) {
    return this.bankAccountService.remove(userId, bankId);
  }
}
