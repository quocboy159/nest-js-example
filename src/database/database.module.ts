import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Skill } from '../users/models/skill.model';
import { UserSkill } from '../users/models/user-skill.model';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        port: configService.get('database.port'),
        host: configService.get('database.host'),
        autoLoadModels: true,
        synchronize: true,
        models: [User.name, Skill.name, UserSkill.name],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
