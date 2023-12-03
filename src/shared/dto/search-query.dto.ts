import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export abstract class SearchQueryDto {
  @ApiProperty({
    description: 'Number of records to skip',
    example: 0,
    required: false,
    minimum: 0,
  })
  @IsOptional({})
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  skip?: number = 0;

  @ApiProperty({
    description: 'Number of records to take',
    example: 10,
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @Min(0)
  @IsOptional({})
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  take?: number = 1;

  @ApiProperty({
    description: 'Sort order',
    example: 'asc',
    required: false,
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortBy?: 'asc' | 'desc';
}
