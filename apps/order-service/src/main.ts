import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix('api');
  const port = process.env.ORDER_SERVICE_PORT || 3004;
  await app.listen(port);
  console.log(`Order Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Order Service:', err);
  process.exit(1);
});
