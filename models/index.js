import { Sequelize, DataTypes } from 'sequelize';
import UserModel from './User/user.js';
import EarningModel from './Earnings/earning.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql', 
    logging: false,  
  }
);

const User = UserModel(sequelize, DataTypes);
const Earning = EarningModel(sequelize, DataTypes);

// Associations
User.hasMany(Earning, { foreignKey: 'user_id' });
Earning.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, User, Earning };
