import { Controller, Body, Get, Post, HttpCode, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
findOne(@Param('id') id: number): Promise<User> {
  return this.usersService.findOne(id);
}


  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.create(createUserDto);
  }
}
