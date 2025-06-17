import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Cho phép CORS nếu frontend gọi tới backend
  app.enableCors({
    origin: '*', // hoặc cụ thể như: ['http://localhost:3001']
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  //  Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Food Ordering API')
    .setDescription('Tài liệu API cho hệ thống đặt món ăn')
    .setVersion('1.0')
    .addTag('auth') // Thêm nhóm tag mẫu
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api

  await app.listen(3000);
  console.log(` Server đang chạy tại: http://localhost:3000`);
  console.log(` Swagger UI: http://localhost:3000/api`);
}
bootstrap();
