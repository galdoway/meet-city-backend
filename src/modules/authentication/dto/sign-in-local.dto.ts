import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsStrongPassword } from 'class-validator';
export class SignInLocalDto implements Pick<User, 'email' | 'password'> {
  @ApiProperty({
    description: "User's email",
    example: 'me@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's strong password",
    example: 'MySecretPassword!',
  })
  @IsStrongPassword()
  password: string;
}
