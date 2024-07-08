import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';

export class FindProductIsSoldResultItem {
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
}

export class FindProductIsSoldResult implements IQueryResult {
  @Expose()
  readonly items: Readonly<FindProductIsSoldResultItem>[];
  @Expose()
  readonly total: number;
}
