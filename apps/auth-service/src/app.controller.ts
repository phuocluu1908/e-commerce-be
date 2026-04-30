import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Post('register')
  register(@Body() body: any) {
    return { message: 'User registered successfully', data: body };
  }

  @Post('login')
  login(@Body() body: any) {
    return { message: 'Login successful', accessToken: 'token' };
  }
}
