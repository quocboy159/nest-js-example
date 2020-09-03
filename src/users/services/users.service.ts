import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserListItemDto } from '../dtos/user-list-item.dto';
import { UserDto } from '../dtos/user.dto';
import { Skill } from '../models/skill.model';
import { UserSkillDto } from '../dtos/user-skill.dto';
import { UserSkill } from '../models/user-skill.model';
import EnumHepler from '../../shared/helpers/enum.helper';
import { SkillLevelLabels, SkillLevel } from '../enums/skill-level.enum';
import { SkillTypeLabels } from '../enums/skill-type.enum';
import { UpdateUserSkillDto } from '../dtos/update-user-skill.dto';
import { SkillExperirenceLabels } from '../enums/skill-experience.enum';
import { UserPermissionRole } from '../enums/user-permission-role.enum';
import { DATE } from 'sequelize';

@Injectable({ scope: Scope.TRANSIENT })
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Skill) private readonly skillModel: typeof Skill,
    @InjectModel(UserSkill) private readonly userSkillModel: typeof UserSkill,
  ) {}

  async findAll(): Promise<UserListItemDto[]> {
    return this.userModel.findAll({
      attributes: { include: ['firstName', 'lastName'] },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    const data = await this.userModel.findOne({
      where: {
        email,
      },
    });

    return data;
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
    response.email = data.email;
    response.provider = data.provider;
    response.isActive = data.isActive;
    response.skills = data.skills.map(x => x.name);
    return response;
  }

  async create(userDto: CreateUserDto): Promise<number> {
    const createdUser = { ...userDto, role: UserPermissionRole.Normal };
    const user = await this.userModel.create(createdUser);
    return user.id;
  }

  async remove(id: number): Promise<void> {
    const user = await this.getById(id);
    await user.destroy();
  }

  public async getSkillsByUserId(userId: number): Promise<UserSkillDto[]> {
    const skills = await this.skillModel.findAll();
    const userSkills = await this.userSkillModel.findAll({
      where: {
        userId: userId,
      },
    });
    const result = skills.map(x => {
      const userSkill = userSkills.find(c => c.skillId == x.id);
      const dateNow: Date | any = new Date();
      const diffDay = (dateNow - x.createdAt) / (1000 * 60 * 60 * 24);
      const data: UserSkillDto = {
        note: userSkill?.note || undefined,
        level: userSkill?.level || undefined,
        levelText:
          userSkill?.level !== undefined && userSkill?.level !== null
            ? EnumHepler.convertEnumToLabel(
                SkillLevelLabels,
                Number(userSkill.level),
              )
            : '',
        skillId: x.id,
        skillName: x.name,
        type: Number(x.type),
        typeText: EnumHepler.convertEnumToLabel(
          SkillTypeLabels,
          Number(x.type),
        ),
        userId: userId,
        yearOfExperiences: userSkill?.yearOfExperiences || undefined,
        yearOfExperiencesText:
          userSkill?.yearOfExperiences !== undefined &&
          userSkill?.yearOfExperiences !== null
            ? EnumHepler.convertEnumToLabel(
                SkillExperirenceLabels,
                Number(userSkill.yearOfExperiences),
              )
            : '',
        isNew: diffDay <= 3,
      };

      return data;
    });

    return result;
  }

  async updateUserSkill(userSkillDto: UpdateUserSkillDto): Promise<void> {
    const userSkillModel = await this.userSkillModel.findOne({
      where: { userId: userSkillDto.userId, skillId: userSkillDto.skillId },
    });

    if (userSkillModel) {
      await userSkillModel.update(userSkillDto);
    } else {
      await this.userSkillModel.create(userSkillDto);
    }
  }

  async removeSkill(userId: number, skillId: number): Promise<void> {
    await this.userSkillModel.destroy({
      where: { userId: userId, skillId: skillId },
    });
  }

  async removeAllSkillByUserId(userId: number): Promise<void> {
    await this.userSkillModel.destroy({
      where: { userId: userId },
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
