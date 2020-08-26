import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './shared/pipes/custom-validation.pipe';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import * as helmet from 'helmet';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { MyLogger } from './shared/services/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ErrorsInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Nest Js Application')
    .setDescription('The Nest Js API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
