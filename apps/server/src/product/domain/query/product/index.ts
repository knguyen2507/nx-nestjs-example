import { FindProductIsSold } from '../../../application/query/product/find';
import { FindProductIsSoldResult } from '../../../application/query/product/find/result';

export interface ProductQuery {
  find: (query: FindProductIsSold) => Promise<FindProductIsSoldResult>;
}
