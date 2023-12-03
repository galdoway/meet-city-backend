import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../../modules/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService
        .getOrThrow<string>('JWT_ACCESS_TOKEN_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne({ uuid: payload.sub });
    return user;
  }
}
