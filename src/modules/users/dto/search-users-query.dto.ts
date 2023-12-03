import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { SearchQueryDto } from '../../../shared/dto/search-query.dto';

export class SearchUsersQueryDto extends SearchQueryDto {
  @ApiProperty({
    enum: Prisma.UserScalarFieldEnum,
    description: 'Sort by field',
    example: 'id',
    required: false,
  })
  @IsOptional()
  @IsEnum(Prisma.UserScalarFieldEnum, { each: true })
  orderBy?: string;
}
