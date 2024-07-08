import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAvaiableProductDefinitions } from '.';
import { GetAvaiableProductDefinitionResult } from './result';
import { ProductDefinitionQueryImplement } from 'apps/server/src/product/infrastructure/query/product-definition';
import { Inject } from '@nestjs/common';

@QueryHandler(GetAvaiableProductDefinitions)
export class GetAvaiableProductDefinitionsHandler
  implements IQueryHandler<GetAvaiableProductDefinitions, GetAvaiableProductDefinitionResult>
{
  @Inject()
  private readonly product_definition: ProductDefinitionQueryImplement;

  async execute(query: GetAvaiableProductDefinitions): Promise<GetAvaiableProductDefinitionResult> {
    return await this.product_definition.get_avaiable(query);
  }
}
