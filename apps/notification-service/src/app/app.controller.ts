import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order_created')
  handleOrderCreated(data: any) {
    console.log('Order created:', data);
  }
  @MessagePattern('payment_processed')
  handlePaymentProcessed(data: any) {
    console.log('Payment processed:', data);
  }
}
