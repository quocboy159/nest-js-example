import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './shared/pipes/custom-validation.pipe';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: true});

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ErrorsInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Nest Js Application')
    .setDescription('The Nest Js API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
