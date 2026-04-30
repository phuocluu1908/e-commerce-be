import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

type CreateOrderBody = {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
};

@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get()
  getOrders(@Query('userId') userId?: string) {
    return {
      message: 'Orders fetched successfully',
      data: this.appService.listOrders(userId),
    };
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return {
      message: 'Order fetched successfully',
      data: this.appService.getOrderById(id),
    };
  }

  @Post()
  createOrder(@Body() body: CreateOrderBody) {
    return {
      message: 'Order created successfully',
      data: this.appService.createOrder(body),
    };
  }

  @Patch(':id/cancel')
  cancelOrder(@Param('id') id: string) {
    return {
      message: 'Order cancelled successfully',
      data: this.appService.cancelOrder(id),
    };
  }
}
