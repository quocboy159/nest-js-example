import { Controller, Get, UseGuards } from '@nestjs/common';
import { EnumModel } from '../models/enum.model';
import EnumHepler from '../../shared/helpers/enum.helper';
import { RoleLabels } from '../../users/enums/roles.enum';
import { SkillLevelLabels } from '../../users/enums/skill-level.enum';
import { SkillTypeLabels } from '../../users/enums/skill-type.enum';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('common')
export class CommonController {
  @Get('roles')
  async GetRoles(): Promise<EnumModel[]> {
    return EnumHepler.getEnumList(RoleLabels);
  }

  @Get('skill-levels')
  async GetSkillLevels(): Promise<EnumModel[]> {
    return EnumHepler.getEnumList(SkillLevelLabels);
  }

  @Get('skill-types')
  async GetSkillTypes(): Promise<EnumModel[]> {
    return EnumHepler.getEnumList(SkillTypeLabels);
  }
}
