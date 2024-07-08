import { BaseQuery } from '../../base';

export class FindProductDefinitions extends BaseQuery {
  data: {
    offset: number;
    limit: number;
    searchName?: string;
    searchType?: string;
    searchValue?: string;
  };

  constructor(data: FindProductDefinitions) {
    super(data);
  }
}
