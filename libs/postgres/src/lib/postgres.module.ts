import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { environment } from '@libs/utility';
import Brand from './entities/brand.entity';
import Category from './entities/category.entity';
import Logs from './entities/logs.entity';
import Otp from './entities/otp.entity';
import ProductDefinition from './entities/product-definition.entity';
import Product from './entities/product.entity';
import Sales from './entities/sales.entity';
import Shop from './entities/shop.entity';
import User from './entities/user.entity';

interface WriteConnection {
  readonly startTransaction: (
    level?: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE',
  ) => Promise<void>;
  readonly commitTransaction: () => Promise<void>;
  readonly rollbackTransaction: () => Promise<void>;
  readonly isTransactionActive: boolean;
  readonly manager: EntityManager;
}

interface ReadConnection {
  readonly getRepository: <T extends ObjectLiteral>(target: EntityTarget<T>) => Repository<T>;
  readonly query: (query: string) => Promise<any>;
  readonly createQueryBuilder: <Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ) => SelectQueryBuilder<Entity>;
}

export let writeConnection = {} as WriteConnection;
export let readConnection = {} as ReadConnection;

class PostgreSQLService implements OnModuleInit, OnModuleDestroy {
  private readonly dataSource = new DataSource({
    type: 'postgres',
    entities: [Brand, Category, Logs, Otp, ProductDefinition, Product, Sales, Shop, User],
    host: environment.POSTGRES_HOST,
    port: environment.POSTGRES_PORT,
    database: environment.POSTGRES_DB,
    username: environment.POSTGRES_USER,
    password: environment.POSTGRES_PASSWORD,
    synchronize: true,
  });

  async onModuleInit(): Promise<void> {
    await this.dataSource.initialize();
    if (!this.dataSource.isInitialized) throw new Error('DataSource is not initialized');
    writeConnection = this.dataSource.createQueryRunner();
    readConnection = this.dataSource.manager;
  }

  async onModuleDestroy(): Promise<void> {
    await this.dataSource.destroy();
  }
}

@Global()
@Module({
  providers: [PostgreSQLService],
})
export class PostgreSQLModule {}
