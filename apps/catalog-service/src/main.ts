import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.CATALOG_SERVICE_PORT || 3002;
  await app.listen(port);
  console.log(`Catalog Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Catalog Service:', err);
  process.exit(1);
});
