import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInLocalDto, SignUpLocalDto } from './dto';
import { UsersService } from '../users/users.service';
import { EncrypterSevice } from '../../shared/services/encrypter.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly usersService: UsersService,
    private readonly encrypterService: EncrypterSevice,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Sign in - Email & Password',
    description: 'Sign in with email & password',
  })
  async signIn(@Body() body: SignInLocalDto) {
    const { email } = body;
    const user = await this.usersService.findOne({ email });
    const accessToken = await this.jwtService.signAsync(
      {},
      {
        privateKey: this.configService
          .getOrThrow<string>('JWT_ACCESS_TOKEN_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
        expiresIn: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_EXPIRES_IN',
        ),
        subject: user.uuid,
        audience: this.configService.getOrThrow<string>(
          'JWT_ACESS_TOKEN_AUDIENCE',
        ),
        issuer: this.configService.getOrThrow<string>('API_SERVER_URL'),
        encoding: 'utf8',
      },
    );

    return {
      message: 'User signed in successfully',
      data: {
        type: 'Bearer',
        access_token: accessToken,
      },
    };
  }

  @Post('sign-up')
  @ApiOperation({
    summary: 'Sign up - Email & Password',
    description: 'Sign up with email & password',
  })
  async signUp(@Body() body: SignUpLocalDto) {
    const { email, password } = body;
    const result = await this.usersService.findOne({ email });
    if (result) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.encrypterService.hash(password);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    const accessToken = await this.jwtService.signAsync(
      {},
      {
        privateKey: this.configService
          .getOrThrow<string>('JWT_ACCESS_TOKEN_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
        expiresIn: '7d',
        subject: user.uuid,
        audience: this.configService.getOrThrow<string>(
          'JWT_ACESS_TOKEN_AUDIENCE',
        ),
        issuer: this.configService.getOrThrow<string>('API_SERVER_URL'),
        encoding: 'utf8',
      },
    );

    return {
      message: 'User signed in successfully',
      data: {
        type: 'Bearer',
        access_token: accessToken,
      },
    };
  }
}
