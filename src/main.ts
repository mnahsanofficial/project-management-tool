import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  // CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });
  
  // WebSockets
  app.useWebSocketAdapter(new IoAdapter(app));
  
  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API for managing projects and tasks')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();