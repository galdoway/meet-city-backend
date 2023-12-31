import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './configs/';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { MeetingsModule } from './modules/meetings/meetings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      expandVariables: true,
    }),
    UsersModule,
    AuthenticationModule,
    AuthorizationModule,
    MeetingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
