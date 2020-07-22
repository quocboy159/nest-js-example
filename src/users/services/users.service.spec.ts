import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { SequelizeModule, InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Sequelize } from 'sequelize/types';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [SequelizeModule.forFeature([User])]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
