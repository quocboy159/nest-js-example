import { Column, Model, Table, Length } from 'sequelize-typescript';
import { Service } from 'typedi';

@Table
@Service()
export class User extends Model<User> {
  @Column({allowNull: false})
  firstName: string;

  @Column({allowNull: false})
  lastName: string;

  @Length({max: 20})
  @Column({allowNull: false, unique: true })
  userName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}