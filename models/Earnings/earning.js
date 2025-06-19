export default (sequelize, DataTypes) => {
    const Earning = sequelize.define('Earning', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      level1_referral: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      level2_referral: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM('expense', 'L1 referral', 'L2 referral'),
        allowNull: false
      },
      action: {
        type: DataTypes.ENUM('credit', 'debit'),
        allowNull: false
      }
    }, {
      tableName: 'earnings',
      timestamps: true,
      underscored: true
    });

    return Earning;
};