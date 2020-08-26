import {
  Column,
  Model,
  Table,
  Length,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { UserSkill } from './user-skill.model';
import { SkillType } from '../enums/skill-type.enum';

@Table
export class Skill extends Model<Skill> {
  @Column({ allowNull: false, unique: true })
  name: string;

  @Column
  description: string;

  @Column({ allowNull: false })
  type: SkillType;

  @BelongsToMany(
    () => User,
    () => UserSkill,
  )
  users: User[];
}
