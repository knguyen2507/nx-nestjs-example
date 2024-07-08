import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DetailProductDefinition } from '.';
import { DetailProductDefinitionResult } from './result';
import { ProductDefinitionQueryImplement } from 'apps/server/src/product/infrastructure/query/product-definition';
import { Inject } from '@nestjs/common';

@QueryHandler(DetailProductDefinition)
export class DetailProductDefinitionHandler
  implements IQueryHandler<DetailProductDefinition, DetailProductDefinitionResult>
{
  @Inject()
  private readonly product_definition: ProductDefinitionQueryImplement;

  async execute(query: DetailProductDefinition): Promise<DetailProductDefinitionResult> {
    return await this.product_definition.get_by_id(query);
  }
}
