import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ, DEAD_LETTER_EXCHANGE, DEAD_LETTER_QUEUE } from '../assets/constant';

@Module({
  imports: [
    ClientsModule.register([{ 
      name: ORDER_SERVICE_RABBITMQ, 
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'order_queue',
        queueOptions: {
          durable: true,
          arguments: {
            'x-dead-letter-exchange': DEAD_LETTER_EXCHANGE,
            'x-dead-letter-routing-key': DEAD_LETTER_QUEUE,
          },
        },
      }, 
    }]),
    ClientsModule.register([{ 
      name: 'DLQ_CLIENT', 
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: DEAD_LETTER_QUEUE,
        queueOptions: {
          durable: true
        },
      }, 
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
