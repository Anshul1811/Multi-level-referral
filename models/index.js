import { Sequelize, DataTypes } from 'sequelize';
import UserModel from './User/user.js';
import EarningModel from './Earnings/earning.js';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'sports_dunia',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'Anshul@123',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql', 
    logging: false,  
  }
);

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Earning = EarningModel(sequelize, DataTypes);

// Associations
User.hasMany(Earning, { foreignKey: 'user_id' });
Earning.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, User, Earning };
