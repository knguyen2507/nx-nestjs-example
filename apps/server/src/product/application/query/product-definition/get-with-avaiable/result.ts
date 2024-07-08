import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class GetAvaiableProductDefinitionResultItem {
  @Expose()
  readonly id: number;
  @Expose()
  readonly code: string;
  @Expose()
  readonly name: string;
  @Expose()
  readonly sell_price: number;
  @Expose()
  readonly thumbnailLink: string;
  @Expose()
  readonly inStock: number;
}

export class GetAvaiableProductDefinitionResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<GetAvaiableProductDefinitionResultItem>[];
  @Expose()
  readonly total: number;
}
