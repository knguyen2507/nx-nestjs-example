import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductIsSold } from '.';
import { FindProductIsSoldResult } from './result';
import { Inject } from '@nestjs/common';
import { ProductQueryImplement } from 'apps/server/src/product/infrastructure/query/product';

@QueryHandler(FindProductIsSold)
export class FindProductIsSoldHandler implements IQueryHandler<FindProductIsSold, FindProductIsSoldResult> {
  @Inject()
  private readonly product: ProductQueryImplement;

  async execute(query: FindProductIsSold): Promise<FindProductIsSoldResult> {
    return await this.product.find(query);
  }
}
