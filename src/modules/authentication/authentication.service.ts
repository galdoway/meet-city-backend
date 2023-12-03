import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { EncrypterSevice } from '../../shared/services/encrypter.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly encrypterService: EncrypterSevice,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await this.encrypterService.compare(
      password,
      user.password,
    );
    if (isPasswordValid) {
      return user;
    }
    return null;
  }
}
