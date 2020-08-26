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
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { MyLogger } from '../../shared/services/my-logger.service';
import { UserListItemDto } from '../dtos/user-list-item.dto';
import { UserDto } from '../dtos/user.dto';
import { REQUEST } from '@nestjs/core';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private myLogger: MyLogger,
    @Inject(REQUEST) private request,
  ) {}

  @Get()
  async findAll(): Promise<UserListItemDto[]> {
    this.myLogger.log('Call findAll Action');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findOne(id);
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
