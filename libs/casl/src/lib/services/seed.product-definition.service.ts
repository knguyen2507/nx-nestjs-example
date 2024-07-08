import { Injectable } from '@nestjs/common';
import { readConnection } from '@libs/postgres';
import { status_deleted, status_used, UtilityImplement } from '@libs/utility';
import { faker } from '@faker-js/faker';
import ProductDefinition from 'libs/postgres/src/lib/entities/product-definition.entity';

@Injectable()
export class SeedProductDefinitionService {
  constructor(private readonly util: UtilityImplement) {}

  seed = async () => {
    const productDefinitions = await readConnection.query('SELECT * FROM product_definition LIMIT 1');
    if (productDefinitions.length === 0) {
      const InitialProductDefinition = await this.auto_create_data(1000);
      await this.util.createInitialData(ProductDefinition, InitialProductDefinition);
    }
  };

  private async auto_create_data(total: number): Promise<any[]> {
    const [brands, categories] = await Promise.all([
      readConnection.query('SELECT * FROM brand'),
      readConnection.query('SELECT * FROM category'),
    ]);

    const data = [];
    for (let i = 1; i <= total; i++) {
      const brand: any = faker.helpers.arrayElement(brands);
      const category: any = faker.helpers.arrayElement(categories);
      const purchase = faker.number.int({ min: 100, max: 500 }) * 10000;
      const thumbnailLink = {
        id: this.util.generateId(),
        name: `initial-product-${i} 0`,
        url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
        isMain: true,
      };
      const images = [];
      images.push(thumbnailLink);
      for (let j = 1; j < faker.number.int({ min: 2, max: 5 }); j++) {
        images.push({
          id: this.util.generateId(),
          name: `initial-product-${i} ${j}`,
          url: faker.image.urlPicsumPhotos({ width: 1200, height: 900 }),
          isMain: false,
        });
      }

      data.push({
        name: `sản phẩm ${category.name} ${brand.name} ${i}`,
        code: `initial-product-${i}`,
        purchase_price: purchase,
        sell_price: purchase + faker.number.int({ min: 30, max: 50 }) * 10000,
        thumbnailLink,
        images,
        description: '',
        brand_id: brand.id,
        category_id: category.id,
        is_used: faker.helpers.arrayElement(status_used),
        is_deleted: faker.helpers.arrayElement(status_deleted),
      });
    }
    return data;
  }
}
