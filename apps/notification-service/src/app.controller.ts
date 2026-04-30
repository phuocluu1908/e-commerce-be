import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-email')
  sendEmail(@Body() body: any) {
    return { message: 'Email sent successfully', data: body };
  }

  @Post('send-sms')
  sendSms(@Body() body: any) {
    return { message: 'SMS sent successfully', data: body };
  }
}
