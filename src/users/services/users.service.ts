import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import {Service} from "typedi";

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(userDto: CreateUserDto): Promise<number> {
    const user = await this.userModel.create(userDto);
    return user.id;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        userName
      },
    });
  }
}
