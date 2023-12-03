import { Module } from '@nestjs/common';
import { EncrypterSevice } from '../../shared/services/encrypter.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication.controller';
@Module({
  providers: [
    EncrypterSevice,
    UsersService,
    LocalStrategy,
    AuthenticationService,
  ],
  exports: [LocalStrategy, AuthenticationService],
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
