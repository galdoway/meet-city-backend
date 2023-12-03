import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpLocalDto implements Pick<User, 'email' | 'password'> {
  @ApiProperty({
    description: "User's email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's strong password",
  })
  @IsStrongPassword()
  password: string;
}
