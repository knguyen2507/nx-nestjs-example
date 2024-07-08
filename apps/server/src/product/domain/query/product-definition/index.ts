import { DetailProductDefinition } from '../../../application/query/product-definition/detail';
import { DetailProductDefinitionResult } from '../../../application/query/product-definition/detail/result';
import { FindProductDefinitions } from '../../../application/query/product-definition/find';
import { FindProductDefinitionsResult } from '../../../application/query/product-definition/find/result';
import { GetAvaiableProductDefinitions } from '../../../application/query/product-definition/get-with-avaiable';
import { GetAvaiableProductDefinitionResult } from '../../../application/query/product-definition/get-with-avaiable/result';

export interface ProductDefinitionQuery {
  find: (query: FindProductDefinitions) => Promise<FindProductDefinitionsResult>;
  get_avaiable: (query: GetAvaiableProductDefinitions) => Promise<GetAvaiableProductDefinitionResult>;
  get_by_id: (query: DetailProductDefinition) => Promise<DetailProductDefinitionResult>;
}
