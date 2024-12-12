import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description for My Project')
    .setVersion('1.0')
    .addBearerAuth() // Optional: Add authentication support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // Swagger UI will be accessible at /api

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
