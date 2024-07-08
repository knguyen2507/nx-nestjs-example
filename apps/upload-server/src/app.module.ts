import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqModule } from '@libse/rabbitmq';

@Module({
  imports: [RmqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
