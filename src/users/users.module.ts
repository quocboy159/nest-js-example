import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { IsUserAlreadyExistConstraint } from './validators/is-user-already-exist.validator';
import { LoggerModule } from '../shared/logger/logger.module';
import { UserSkill } from './models/user-skill.model';
import { Skill } from './models/skill.model';
import { SkillsService } from './services/skills.service';
import { SkillsController } from './controllers/skills.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Skill, UserSkill]), LoggerModule],
  exports: [UsersService],
  controllers: [UsersController, SkillsController],
  providers: [UsersService, SkillsService, IsUserAlreadyExistConstraint],
})
export class UsersModule {}
