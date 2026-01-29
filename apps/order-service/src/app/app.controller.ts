import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../assets/constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(PAYMENT_CLIENT) private readonly paymentRMQClient: ClientProxy,
    @Inject(NOTIFICATION_CLIENT) private readonly notificationRMQClient: ClientProxy,


  ) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern("order_created")
  handleOrderCreated(data: any) {
    console.log("Order created:", data);

    this.paymentRMQClient.emit('process_payment', data);
    this.notificationRMQClient.emit('order_created', data);
  }
}
