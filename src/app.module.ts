import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      username: 'postgres',
      password: 'Helloworld123',
      database: 'Test',
      port: 5432,
      host: 'localhost',
      autoLoadModels: true,
      synchronize: true,
      models: [User.name],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
