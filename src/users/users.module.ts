import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { IsUserAlreadyExistConstraint } from './validators/is-user-already-exist.validator';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, IsUserAlreadyExistConstraint],
})
export class UsersModule {}
