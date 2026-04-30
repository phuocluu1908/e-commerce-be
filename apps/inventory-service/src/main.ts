import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.INVENTORY_SERVICE_PORT || 3006;
  await app.listen(port);
  console.log(`Inventory Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Inventory Service:', err);
  process.exit(1);
});
