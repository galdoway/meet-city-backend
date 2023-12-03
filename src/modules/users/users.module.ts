import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../shared/services/prisma.service';
import { EncrypterSevice } from '../../shared/services/encrypter.service';

@Module({
  providers: [PrismaService, UsersService, EncrypterSevice],
  controllers: [UsersController],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
