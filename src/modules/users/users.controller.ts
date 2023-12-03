import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { EncrypterSevice } from '../../shared/services/encrypter.service';
import { AccessTokenGuard } from '../authorization/guards/access-token.guard';
import { CreateUserDto, SearchUsersQueryDto } from './dto';

@Controller({ path: 'users' })
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly encrypterService: EncrypterSevice,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  async create(@Body() body: CreateUserDto) {
    const { email, password } = body;
    const result = await this.usersService.findOne({ email });
    if (result) {
      throw new BadRequestException({
        code: 'USER_ALREADY_EXISTS',
        message: 'User already exists',
      });
    }
    const newUser = await this.usersService.create({
      email,
      password: await this.encrypterService.hash(password),
    });

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  async findAll(@Query() query: SearchUsersQueryDto) {
    const { skip, take, orderBy, sortBy } = query;
    const result = await this.usersService.findMany({
      skip,
      take,
      orderBy: { [orderBy]: sortBy },
    });

    if (result.users.length <= 0) {
      throw new BadRequestException('No users found');
    }

    return {
      message: 'Users fetched successfully',
      data: result,
    };
  }

  @Delete(':uuid')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user',
  })
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const result = await this.usersService.findOne({ uuid });
    if (!result) {
      throw new BadRequestException('User does not exist');
    }
    const deleted = this.usersService.delete({
      uuid: uuid,
    });
    return {
      message: 'User deleted successfully',
      data: deleted,
    };
  }
}
