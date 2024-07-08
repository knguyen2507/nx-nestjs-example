import { Injectable } from '@nestjs/common';
import { readConnection } from '@libs/postgres';
import { InitialShop, UtilityImplement } from '@libs/utility';
import Shop from 'libs/postgres/src/lib/entities/shop.entity';

@Injectable()
export class SeedShopService {
  constructor(private readonly util: UtilityImplement) {}

  seed = async () => {
    const shops = await readConnection.query('SELECT * FROM shop LIMIT 1');
    if (shops.length === 0) {
      await this.util.createInitialData(Shop, InitialShop);
    }
  };
}
