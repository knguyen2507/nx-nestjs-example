import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DetailProductDefinitionRequestDTO {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  readonly id!: number;
}
