import { Module } from '@nestjs/common';
import { ProductDefinationQueryController, ProductQueryController } from './presentation/query.controler';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductDefinitionQueryImplement } from './infrastructure/query/product-definition';
import { FindProductDefinitionsHandler } from './application/query/product-definition/find/handler';
import { PostgreSQLModule } from '@libs/postgres';
import { UtilityModule } from '@libs/utility';
import { GetAvaiableProductDefinitionsHandler } from './application/query/product-definition/get-with-avaiable/handler';
import { DetailProductDefinitionHandler } from './application/query/product-definition/detail/handler';
import { ProductQueryImplement } from './infrastructure/query/product';
import { FindProductIsSoldHandler } from './application/query/product/find/handler';

const infrastructures = [ProductDefinitionQueryImplement, ProductQueryImplement];
const commands = [];
const queries = [
  FindProductDefinitionsHandler,
  GetAvaiableProductDefinitionsHandler,
  DetailProductDefinitionHandler,
  FindProductIsSoldHandler,
];
const domains = [];

const modules = [CqrsModule, PostgreSQLModule, UtilityModule];
const controllers = [ProductDefinationQueryController, ProductQueryController];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...queries, ...commands, ...domains, ...infrastructures],
})
export class ProductModule {}
