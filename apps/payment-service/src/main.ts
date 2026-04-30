import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PAYMENT_SERVICE_PORT || 3005;
  await app.listen(port);
  console.log(`Payment Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Payment Service:', err);
  process.exit(1);
});
