import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: 'VNDEV20',
        username: 'FORTRESS\\quoc.do',
        database: 'nest',
      });
      sequelize.addModels([User.name]);
      await sequelize.sync();
      return sequelize;
    },
  },
];