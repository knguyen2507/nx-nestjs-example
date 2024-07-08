import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { RMQ } from '@libs/utility';
import { environment } from '@libs/utility';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: RMQ.EXCHANGE,
          type: 'topic',
        },
      ],
      uri: `amqp://${environment.RMQ_USER}:${environment.RMQ_PASSWORD}@${environment.RMQ_HOST}:${environment.RMQ_PORT}`,
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
  ],
  providers: [],
  exports: [RabbitMQModule],
})
export class RmqModule {}
