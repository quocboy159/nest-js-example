import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      username: 'postgres',
      password: 'Helloworld123',
      database: 'Test',
      port: 5432,
      host:'localhost',
      autoLoadModels: true,
      synchronize: true,
      models: [User.name]
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
