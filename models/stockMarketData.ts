import { Database } from './index.js';
import Stock from './stock.js';
import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  Association,
} from 'sequelize';

const sequelize = await Database.getSequelize();

interface StockMarketDataAttributes {
  stockId: number;
  longName: string;
  symbol: string;
  regularMarketPrice: number;
  regularMarketTime?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class StockMarketData extends Model<StockMarketDataAttributes>
  implements StockMarketDataAttributes {
  declare stockId: number;
  declare longName: string;
  declare symbol: string;
  declare regularMarketPrice: number;
  declare regularMarketTime?: Date;

  declare getStock: BelongsToManyGetAssociationsMixin<Stock>;
  declare addStock: BelongsToManyAddAssociationMixin<Stock, number>;

  declare associations: {
    stock: Association<StockMarketData, Stock>;
  };

  public static associate(models: { Stock: typeof Stock }) {
    StockMarketData.belongsTo(models.Stock, {
      foreignKey: 'stockId',
      as: 'stock',
    });
  }
}

StockMarketData.init(
  {
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stocks',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    longName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regularMarketPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    regularMarketTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'StockMarketData',
    tableName: 'stock_market_data',
    timestamps: true,
    underscored: true,
  }
);

export default StockMarketData;
