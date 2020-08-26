import {
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SkillsService } from '../services/skills.service';
import { Skill } from '../models/skill.model';
import { CreateSkillDto } from '../dtos/create-skill.dto';
import { SkillDto } from '../dtos/skill.dto';
import { EditSkillDto } from '../dtos/edit-skill.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll(): Promise<SkillDto[]> {
    return this.skillsService.findAll();
  }

  @Post()
  @HttpCode(200)
  async create(@Body() model: CreateSkillDto): Promise<number> {
    return this.skillsService.create(model);
  }

  @Put(':id')
  @HttpCode(200)
  async Edit(
    @Param('id') id: number,
    @Body() model: EditSkillDto,
  ): Promise<void> {
    model.id = id;
    await this.skillsService.edit(model);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: number): Promise<void> {
    this.skillsService.remove(id);
  }
}
