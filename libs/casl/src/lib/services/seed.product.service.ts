import { Injectable } from '@nestjs/common';
import { readConnection } from '@libs/postgres';
import { status_deleted, UtilityImplement } from '@libs/utility';
import { faker, fakerVI } from '@faker-js/faker';
import Product from 'libs/postgres/src/lib/entities/product.entity';
import moment = require('moment');

@Injectable()
export class SeedProductService {
  constructor(private readonly util: UtilityImplement) {}

  seed = async () => {
    const products = await readConnection.query('SELECT * FROM product LIMIT 1');
    if (products.length === 0) {
      const InitialProduct = await this.auto_create_data(10, 20);
      await this.util.createInitialData(Product, InitialProduct);
    }
  };

  private async auto_create_data(total_min: number, total_max: number): Promise<any[]> {
    const [product_definitions, shops] = await Promise.all([
      readConnection.query('SELECT * FROM product_definition'),
      readConnection.query('SELECT * FROM shop'),
    ]);

    const data = [];
    const dictricts = ['Phù Cát', 'An Nhơn', 'Tây Sơn'];

    for (const product_definition of product_definitions) {
      const total = faker.number.int({ min: total_min, max: total_max });
      for (let i = 1; i <= total; i++) {
        const shop: any = faker.helpers.arrayElement(shops);
        const sold_price = product_definition.sell_price - faker.number.int({ min: 0, max: 10 }) * 10000;
        const is_sold = faker.helpers.arrayElement(status_deleted);
        let buyer_info = {};
        if (is_sold) {
          buyer_info = {
            name: `${fakerVI.person.lastName()} ${fakerVI.person.firstName()}`,
            phone: this.util.randomPhone(),
            email: faker.internet.email(),
            address: `${faker.helpers.arrayElement(dictricts)}, Bình Định`,
            at: moment().toDate(),
          };
        }

        data.push({
          product_definition_id: product_definition.id,
          is_sold,
          buyer_info,
          sold_price,
          description: '',
          shop_id: shop.id,
        });
      }
    }
    return data;
  }
}
