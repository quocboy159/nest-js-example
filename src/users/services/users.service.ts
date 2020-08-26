import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserListItemDto } from '../dtos/user-list-item.dto';
import { UserDto } from '../dtos/user.dto';
import { UserSkill } from '../models/user-skill.model';
import { Skill } from '../models/skill.model';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(): Promise<UserListItemDto[]> {
    return this.userModel.findAll({
      attributes: { include: ['firstName', 'lastName'] },
    });
  }

  async findOne(id: number): Promise<UserDto> {
    const data = await this.userModel.findOne({
      where: {
        id,
      },
      include: [Skill],
    });

    const response: UserDto = new UserDto();
    response.firstName = data.firstName;
    response.lastName = data.lastName;
    response.userName = data.userName;
    response.isActive = data.isActive;
    response.skills = data.skills.map(x => x.name);
    return response;
  }

  async create(userDto: CreateUserDto): Promise<number> {
    const user = await this.userModel.create(userDto);
    return user.id;
  }

  async remove(id: number): Promise<void> {
    const user = await this.getById(id);
    await user.destroy();
  }

  async findByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        userName,
      },
    });
  }

  private async getById(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
}
