/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DEAD_LETTER_EXCHANGE, DEAD_LETTER_QUEUE } from './assets/constant';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
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
  });
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  // const port = process.env.PORT || 3000;
  await app.listen();
  Logger.log(
    `🚀 Application is running on Listenning RabbitMQ` ,
  );
}

bootstrap();
