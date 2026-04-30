import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cart')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get()
  getCart() {
    return { message: 'Get cart items', items: [] };
  }

  @Post('add')
  addToCart(@Body() body: any) {
    return { message: 'Item added to cart', data: body };
  }
}
