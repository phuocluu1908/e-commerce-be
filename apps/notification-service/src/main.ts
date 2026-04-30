import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.NOTIFICATION_SERVICE_PORT || 3007;
  await app.listen(port);
  console.log(`Notification Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Notification Service:', err);
  process.exit(1);
});
