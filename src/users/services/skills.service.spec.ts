import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule, InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize/types';
import { Skill } from '../models/skill.model';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillsService],
      imports: [SequelizeModule.forFeature([User, Skill])],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
