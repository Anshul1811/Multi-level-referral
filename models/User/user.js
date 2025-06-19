export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      referral_code: {
        type: DataTypes.STRING,
        unique: true
      },
      referred_by: {
        type: DataTypes.STRING,
        allowNull: true
      },
      count : DataTypes.INTEGER
    },{
      tableName: 'users',
      timestamps: true, 
      underscored: true
    });
  
    return User;
}; 