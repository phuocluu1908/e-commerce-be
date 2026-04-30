import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.CART_SERVICE_PORT || 3003;
  await app.listen(port);
  console.log(`Cart Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Cart Service:', err);
  process.exit(1);
});
