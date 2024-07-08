import { readConnection } from '@libs/postgres';
import { FindProductDefinitions } from '../../../application/query/product-definition/find';
import { FindProductDefinitionsResult } from '../../../application/query/product-definition/find/result';
import { ProductDefinitionQuery } from '../../../domain/query/product-definition';
import ProductDefinition from 'libs/postgres/src/lib/entities/product-definition.entity';
import Product from 'libs/postgres/src/lib/entities/product.entity';
import { GetAvaiableProductDefinitions } from '../../../application/query/product-definition/get-with-avaiable';
import { GetAvaiableProductDefinitionResult } from '../../../application/query/product-definition/get-with-avaiable/result';
import { DetailProductDefinition } from '../../../application/query/product-definition/detail';
import { DetailProductDefinitionResult } from '../../../application/query/product-definition/detail/result';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ProductDefinitionQueryImplement implements ProductDefinitionQuery {
  async get_avaiable(query: GetAvaiableProductDefinitions): Promise<GetAvaiableProductDefinitionResult> {
    return this.get_with_instock(query);
  }

  async find(query: FindProductDefinitions): Promise<FindProductDefinitionsResult> {
    const { items, total } = await this.get_with_instock(query);

    const data = items.map((item) => {
      return {
        ...item,
        inStock: item.inStock > 0 ? true : false,
      };
    });

    return {
      items: data,
      total,
    };
  }

  async get_with_instock(query: GetAvaiableProductDefinitions): Promise<GetAvaiableProductDefinitionResult> {
    const { offset, limit } = query.data;
    const queryBuilder = readConnection.createQueryBuilder(ProductDefinition, 't1');

    const dataSource = queryBuilder
      .where(`t1.is_used = TRUE`)
      .andWhere(`t1.is_deleted = FALSE`)
      .orderBy("t1.created_at->>'at'", 'ASC')
      .addOrderBy('t1.id', 'ASC')
      .offset(offset)
      .limit(limit)
      .leftJoin(
        (qb) =>
          qb
            .from(Product, `t2`)
            .groupBy(`t2.product_definition_id`)
            .where(`t2.is_sold = FALSE`)
            .select(`t2.product_definition_id`, `product_definition_id`)
            .addSelect(`COUNT(*)`, `inStock`),
        'product_in_stock',
        'product_in_stock.product_definition_id = t1.id',
      )
      .select(
        `
        t1.id as "id", 
        t1.name as "name",
        t1.code as "code", 
        t1.sell_price as "sell_price", 
        "t1"."thumbnailLink"->>'url' as "thumbnailLink"
        `,
      )
      .addSelect('"product_in_stock"."inStock"', 'inStock');

    const [items, total] = await Promise.all([dataSource.getRawMany(), dataSource.getCount()]);
    return {
      items,
      total,
    };
  }

  async get_by_id(query: DetailProductDefinition): Promise<DetailProductDefinitionResult> {
    const queryBuilder = readConnection.createQueryBuilder(ProductDefinition, 't1');

    const dataSource = queryBuilder
      .where(`t1.id = ${query.data.id}`)
      .andWhere(`t1.is_used = TRUE`)
      .andWhere(`t1.is_deleted = FALSE`)
      .leftJoin(
        (qb) =>
          qb
            .from(Product, `t2`)
            .groupBy(`t2.product_definition_id`)
            .where(`t2.is_sold = FALSE`)
            .select(`t2.product_definition_id`, `product_definition_id`)
            .addSelect(`COUNT(*)`, `inStock`),
        'product_in_stock',
        'product_in_stock.product_definition_id = t1.id',
      )
      .leftJoinAndSelect('t1.brand', 't3')
      .leftJoinAndSelect('t1.category', 't4')
      .select(
        `
        t1.id as "id", 
        t1.name as "name",
        t1.code as "code", 
        t1.sell_price as "sell_price", 
        t1.thumbnailLink as "thumbnailLink",
        t1.description as "description",
        t1.images as "images",
        t1.is_deleted as "is_deleted",
        t1.is_used as "is_used",
        t1.meta as "meta",
        t3.name as "brand",
        t4.name as "category"
        `,
      )
      .addSelect('"product_in_stock"."inStock"', 'inStock');

    const product_definition = await dataSource.getRawOne();

    if (!product_definition || !product_definition.is_used) {
      throw new NotFoundException('product_definition');
    }
    if (product_definition.is_deleted) {
      throw new BadRequestException('product_definition');
    }

    return {
      ...product_definition,
      inStock: product_definition.inStock > 0 ? true : false,
    };
  }
}
