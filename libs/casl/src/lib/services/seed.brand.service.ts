import { Injectable } from '@nestjs/common';
import { readConnection } from '@libs/postgres';
import { InitialBrand, UtilityImplement } from '@libs/utility';
import Brand from 'libs/postgres/src/lib/entities/brand.entity';

@Injectable()
export class SeedBrandService {
  constructor(private readonly util: UtilityImplement) {}

  seed = async () => {
    const brands = await readConnection.query('SELECT * FROM brand LIMIT 1');
    if (brands.length === 0) {
      await this.util.createInitialData(Brand, InitialBrand);
    }
  };
}
