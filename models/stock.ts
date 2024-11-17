import { Model, DataTypes, Association } from 'sequelize';
import { Database } from './index.js';
import User from '@models/user.js';
import StockMarketData from '@models/stockMarketData.js';

const sequelize = await Database.getSequelize();

interface StockAttributes {
  id?: number;
  symbol: string;
  created_at?: Date;
  updated_at?: Date;
}

class Stock extends Model<StockAttributes> {
  declare id: number;
  declare symbol: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare static associations: {
    marketData: Association<Stock, any>;
  };

  public static associate(models: { StockMarketData: typeof StockMarketData }) {
    Stock.hasMany(models.StockMarketData, {
      foreignKey: 'stockId',
      as: 'marketData',
    });
  }
}

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

Stock.associate({ StockMarketData });
StockMarketData.associate({ Stock });

export default Stock;
