import { BaseQuery } from '../../base';

export class DetailProductDefinition extends BaseQuery {
  data: {
    id: number;
  };

  constructor(data: DetailProductDefinition) {
    super(data);
  }
}
