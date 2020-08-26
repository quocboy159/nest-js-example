import {
  Column,
  Model,
  Table,
  Length,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserSkill } from './user-skill.model';
import { Skill } from './skill.model';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Length({ max: 20 })
  @Column({ allowNull: false, unique: true })
  userName: string;

  @Length({ min: 6 })
  @Column({ allowNull: false })
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(
    () => Skill,
    () => UserSkill,
  )
  skills: Skill[];
}
