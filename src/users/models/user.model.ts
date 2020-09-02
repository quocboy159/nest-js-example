import {
  Column,
  Model,
  Table,
  BelongsToMany,
  IsEmail,
} from 'sequelize-typescript';
import { UserSkill } from './user-skill.model';
import { Skill } from './skill.model';
import { Provider } from '../../auth/enums/providers.enum';
import { UserTypes } from '../enums/user-type.enum';

@Table
export class User extends Model<User> {
  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @IsEmail
  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  provider: Provider;

  @Column({ allowNull: false })
  type: UserTypes;

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(
    () => Skill,
    () => UserSkill,
  )
  skills: Skill[];
}
