import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  @Inject('NOTIFICATION_CLIENT') private readonly notificationRMQClient: ClientProxy,


  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }


  @MessagePattern("process_payment")
  handleProcessPayment( data: any) {
    // Simulate payment processing logic
    console.log("'[Payment Service] Processing payment for order:", data);
    const transactionId = Math.random().toString(36).substring(2, 15);
    this.notificationRMQClient.emit('payment_processed', {
      orderId: data.orderId,
      status: 'Payment Successful',
      transactionId: transactionId,
    });
  }
}
