import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccessControlManager } from '@secure-access-control';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AccessControlManager(reflector));

  await app.listen(3000);
}
bootstrap();
