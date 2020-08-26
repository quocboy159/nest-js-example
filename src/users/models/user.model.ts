import {
  Column,
  Model,
  Table,
  Length,
  BelongsToMany,
  IsEmail,
} from 'sequelize-typescript';
import { UserSkill } from './user-skill.model';
import { Skill } from './skill.model';
import { Provider } from '../../auth/enums/providers.enum';

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

  @Column({ defaultValue: true })
  isActive: boolean;

  @BelongsToMany(
    () => Skill,
    () => UserSkill,
  )
  skills: Skill[];
}
