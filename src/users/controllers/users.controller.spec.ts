import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';

const mockUsersService = {
  async findAll(): Promise<User[]> {
    return [];
  },

  async findOne(id: number): Promise<User> {
    return new User();
  },

  async create(userDto: CreateUserDto): Promise<number> {
    return 1;
  },

  async remove(id: number): Promise<void> {
  }
};

describe('Users Controller', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      // providers: [UsersService],
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUsersService,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
