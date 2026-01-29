import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../assets/constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'payment_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    ClientsModule.register([
      {
        name:NOTIFICATION_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'notification_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
