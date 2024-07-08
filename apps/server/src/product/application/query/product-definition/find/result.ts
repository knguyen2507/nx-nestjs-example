import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductDefinitionResultItem {
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
  readonly inStock: boolean;
}

export class FindProductDefinitionsResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductDefinitionResultItem>[];
  @Expose()
  readonly total: number;
}
