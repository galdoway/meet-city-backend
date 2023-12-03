import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AccessTokenStrategy],
  imports: [JwtModule.register({}), UsersModule],
})
export class AuthorizationModule {}
