import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Skill } from '../models/skill.model';
import { CreateSkillDto } from '../dtos/create-skill.dto';
import { SkillDto } from '../dtos/skill.dto';
import { SkillType, SkillTypeLabels } from '../enums/skill-type.enum';
import EnumHepler from '../../shared/helpers/enum.helper';
import { EditSkillDto } from '../dtos/edit-skill.dto';

@Injectable({ scope: Scope.REQUEST })
export class SkillsService {
  constructor(@InjectModel(Skill) private readonly skillModel: typeof Skill) {}

  async findAll(): Promise<SkillDto[]> {
    const skills = await this.skillModel.findAll();
    const result = skills.map((x: Skill) => {
      const item: SkillDto = {
        id: x.id,
        name: x.name,
        description: x.description,
        type: Number(x.type),
        typeText: EnumHepler.convertEnumToLabel(
          SkillTypeLabels,
          Number(x.type),
        ),
      };

      return item;
    });

    return result;
  }

  async create(model: CreateSkillDto): Promise<number> {
    const data = await this.skillModel.create(model);
    return data.id;
  }

  async edit(model: EditSkillDto): Promise<void> {
    await this.skillModel.update(model, { where: { id: model.id } });
  }

  async remove(id: number): Promise<void> {
    const skill = await this.findOne(id);
    await skill.destroy();
  }

  private async findOne(id: number): Promise<Skill> {
    return this.skillModel.findOne({
      where: {
        id,
      },
    });
  }
}
