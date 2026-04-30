import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('inventory')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get()
  getInventory() {
    return { message: 'Get inventory', items: [] };
  }

  @Post('update')
  updateInventory(@Body() body: any) {
    return { message: 'Inventory updated', data: body };
  }
}
