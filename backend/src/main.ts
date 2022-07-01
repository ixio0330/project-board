import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap(configService: ConfigService) {
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.get('SERVER_PORT') || 9900);
}
bootstrap(new ConfigService());
