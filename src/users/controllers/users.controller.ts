import {
  Controller,
  Body,
  Get,
  Post,
  HttpCode,
  Param,
  Delete,
  UseGuards,
  Inject,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { MyLogger } from '../../shared/services/my-logger.service';
import { UserListItemDto } from '../dtos/user-list-item.dto';
import { UserDto } from '../dtos/user.dto';
import { REQUEST } from '@nestjs/core';
import { UserSkillDto } from '../dtos/user-skill.dto';
import { UpdateUserSkillDto } from '../dtos/update-user-skill.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private myLogger: MyLogger,
    @Inject(REQUEST) private request,
  ) {}

  @Get('/skills')
  async getSkillsByCurentUser(): Promise<UserSkillDto[]> {
    this.request;
    const data = await this.usersService.getSkillsByUserId(
      this.request.user.id,
    );

    return data;
  }

  @Get(':id/skills')
  async getSkillsByUserId(@Param('id') id: number): Promise<UserSkillDto[]> {
    this.request;
    const data = await this.usersService.getSkillsByUserId(id);

    return data;
  }

  @Get()
  async findAll(): Promise<UserListItemDto[]> {
    this.myLogger.log('Call findAll Action');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Put('/update-skill')
  @HttpCode(200)
  async updateSkill(@Body() model: UpdateUserSkillDto): Promise<void> {
    this.usersService.updateUserSkill(model);
  }

  @Delete(':userId/delete-skill/:skillId')
  @HttpCode(200)
  async deleteSkill(
    @Param('userId') userId: number,
    @Param('skillId') skillId: number,
  ): Promise<void> {
    this.usersService.removeSkill(userId, skillId);
  }

  @Delete(':userId/delete-all-skills')
  @HttpCode(200)
  async deleteAllSkillByUserId(@Param('userId') userId: number): Promise<void> {
    this.usersService.removeAllSkillByUserId(userId);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: number): Promise<void> {
    this.usersService.remove(id);
  }
}
