import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LoginController],
  providers: [PrismaService,LoginService],
})
export class LoginModule {}
