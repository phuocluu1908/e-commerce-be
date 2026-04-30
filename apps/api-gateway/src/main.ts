import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.API_GATEWAY_PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap API Gateway:', err);
  process.exit(1);
});
