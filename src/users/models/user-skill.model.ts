import {
  Column,
  Model,
  Table,
  Length,
  BelongsTo,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Skill } from './skill.model';
import { SkillLevel } from '../enums/skill-level.enum';
import { SkillExperirence } from '../enums/skill-experience.enum';

@Table
export class UserSkill extends Model<UserSkill> {
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => Skill)
  skill: Skill;

  @ForeignKey(() => Skill)
  @PrimaryKey
  @Column({ allowNull: false })
  skillId: number;

  @Column
  yearOfExperiences?: SkillExperirence;

  @Column
  level?: SkillLevel;

  @Column
  note: string | undefined;
}
