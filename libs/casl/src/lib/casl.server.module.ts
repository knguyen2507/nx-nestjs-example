import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { SeedShopService } from './services/seed.shop.service';
import { PostgreSQLModule } from '@libs/postgres';
import { SeedUserService } from './services/seed.user.service';
import { UtilityModule } from '@libs/utility';
import { SeedBrandService } from './services/seed.brand.service';
import { SeedCategoryService } from './services/seed.category.service';
import { SeedProductDefinitionService } from './services/seed.product-definition.service';
import { SeedProductService } from './services/seed.product.service';

@Module({
  imports: [PostgreSQLModule, UtilityModule],
  providers: [
    SeedShopService,
    SeedUserService,
    SeedBrandService,
    SeedCategoryService,
    SeedProductDefinitionService,
    SeedProductService,
  ],
  exports: [],
})
export class CaslServerModule implements OnModuleInit {
  constructor(
    @Inject(SeedShopService) private seedShopService: SeedShopService,
    @Inject(SeedUserService) private seedUserService: SeedUserService,
    @Inject(SeedBrandService) private seedBrandService: SeedBrandService,
    @Inject(SeedCategoryService) private seedCategoryService: SeedCategoryService,
    @Inject(SeedProductDefinitionService) private seedProductDefinitionService: SeedProductDefinitionService,
    @Inject(SeedProductService) private seedProductService: SeedProductService,
  ) {}

  async onModuleInit() {
    await this.seedShopService.seed();
    await this.sleep(1000);
    await this.seedUserService.seed();
    await this.sleep(1000);
    await this.seedBrandService.seed();
    await this.sleep(1000);
    await this.seedCategoryService.seed();
    await this.sleep(1000);
    await this.seedProductDefinitionService.seed();
    await this.sleep(1000);
    await this.seedProductService.seed();
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
