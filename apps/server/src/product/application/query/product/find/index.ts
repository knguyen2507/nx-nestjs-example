import { BaseQuery } from '../../base';

export class FindProductIsSold extends BaseQuery {
  data: {
    offset: number;
    limit: number;
    searchName?: string;
    searchType?: string;
    searchValue?: string;
  };

  constructor(data: FindProductIsSold) {
    super(data);
  }
}
