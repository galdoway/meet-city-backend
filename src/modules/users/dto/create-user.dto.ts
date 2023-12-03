import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto implements Pick<User, 'email' | 'password'> {
  @ApiProperty({
    example: 'me@email.com',
    description: "User's Email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'MySecretPassword!',
    description: 'A Strong password',
  })
  @IsStrongPassword({})
  password: string;
}
