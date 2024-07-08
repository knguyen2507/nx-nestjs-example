import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductDefinitions } from '.';
import { FindProductDefinitionsResult } from './result';
import { ProductDefinitionQueryImplement } from 'apps/server/src/product/infrastructure/query/product-definition';
import { Inject } from '@nestjs/common';

@QueryHandler(FindProductDefinitions)
export class FindProductDefinitionsHandler
  implements IQueryHandler<FindProductDefinitions, FindProductDefinitionsResult>
{
  @Inject()
  private readonly product_definition: ProductDefinitionQueryImplement;

  async execute(query: FindProductDefinitions): Promise<FindProductDefinitionsResult> {
    return await this.product_definition.find(query);
  }
}
