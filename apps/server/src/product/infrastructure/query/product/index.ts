import { readConnection } from '@libs/postgres';
import ProductDefinition from 'libs/postgres/src/lib/entities/product-definition.entity';
import Product from 'libs/postgres/src/lib/entities/product.entity';
import { ProductQuery } from '../../../domain/query/product';
import { FindProductIsSoldResult } from '../../../application/query/product/find/result';
import { FindProductIsSold } from '../../../application/query/product/find';

export class ProductQueryImplement implements ProductQuery {
  async find(query: FindProductIsSold): Promise<FindProductIsSoldResult> {
    const { offset, limit } = query.data;
    const queryBuilder = readConnection.createQueryBuilder(Product, 't1');
    const dataSource = queryBuilder
      .leftJoinAndSelect('t1.product_definition', 't2')
      .leftJoinAndSelect('t2.brand', 't3')
      .leftJoinAndSelect('t2.category', 't4')
      .where(`t1.is_sold = TRUE`)
      .andWhere(`t2.is_used = FALSE`)
      .andWhere(`t2.is_deleted = FALSE`)
      .orderBy("t1.created_at->>'at'", 'ASC')
      .addOrderBy('t1.id', 'ASC')
      .offset(offset)
      .limit(limit)
      .select(
        `
        t1.id as "id", 
        t2.name as "name",
        t2.code as "code", 
        t2.sell_price as "sell_price", 
        "t2"."thumbnailLink"->>'url' as "thumbnailLink"
        `,
      );

    const [items, total] = await Promise.all([dataSource.getRawMany(), dataSource.getCount()]);
    return {
      items,
      total,
    };
  }
}
