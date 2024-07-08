import { Module } from '@nestjs/common';
import { CerbosModule } from '@libs/cerbos';
import { PostgreSQLModule } from '@libs/postgres';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CaslServerModule } from '@libs/casl';
import { UtilityModule } from '@libs/utility';

@Module({
  imports: [CaslServerModule, UtilityModule, CerbosModule, PostgreSQLModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
