import { BaseQuery } from '../../base';

export class GetAvaiableProductDefinitions extends BaseQuery {
  data: {
    offset: number;
    limit: number;
    searchName?: string;
    searchType?: string;
    searchValue?: string;
  };

  constructor(data: GetAvaiableProductDefinitions) {
    super(data);
  }
}
