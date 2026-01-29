import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, DEAD_LETTER_EXCHANGE, DEAD_LETTER_QUEUE } from '../assets/constant';

@Module({
  imports: [  ClientsModule.register([
      {
        name: NOTIFICATION_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'notification_queue',
          queueOptions: { 
            durable: true,
            arguments: {
              'x-dead-letter-exchange': DEAD_LETTER_EXCHANGE,
              'x-dead-letter-routing-key': DEAD_LETTER_QUEUE,
            },
          },
        },
      },
    ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
