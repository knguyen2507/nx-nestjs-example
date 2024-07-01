import { Module } from '@nestjs/common';
import { CerbosModule } from '@libs/cerbos';
import { PostgreSQLModule } from '@libs/postgres';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CerbosModule, PostgreSQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
