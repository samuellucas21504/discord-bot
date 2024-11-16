import { Model, DataTypes } from 'sequelize';
import { Database } from './index.js';
import User from '@models/user.js';

const sequelize = await Database.getSequelize();

interface StockAttributes {
  id?: number;
  symbol: string;
  created_at?: Date;
  updated_at?: Date;
}

class Stock extends Model<StockAttributes> { }

Stock.init({
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize,
    modelName: 'Stock',
    tableName: 'stocks',
    timestamps: true,
    underscored: true,
  }
);

User.belongsToMany(Stock, {
  through: 'user_stocks',
  foreignKey: 'userId',
  otherKey: 'stockId',
});

Stock.belongsToMany(User, {
  through: 'user_stocks',
  foreignKey: 'stockId',
  otherKey: 'userId',
});


export default Stock;
