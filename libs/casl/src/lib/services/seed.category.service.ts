import { Injectable } from '@nestjs/common';
import { readConnection } from '@libs/postgres';
import { InitialCategory, UtilityImplement } from '@libs/utility';
import Category from 'libs/postgres/src/lib/entities/category.entity';

@Injectable()
export class SeedCategoryService {
  constructor(private readonly util: UtilityImplement) {}

  seed = async () => {
    const categories = await readConnection.query('SELECT * FROM category LIMIT 1');
    if (categories.length === 0) {
      await this.util.createInitialData(Category, InitialCategory);
    }
  };
}
