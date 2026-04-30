import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.AUTH_SERVICE_PORT || 3001;
  await app.listen(port);
  console.log(`Auth Service listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap Auth Service:', err);
  process.exit(1);
});
